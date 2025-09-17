-- 触发器：在插入预订记录前检查代理权限
DELIMITER $$
CREATE TRIGGER trg_bookings_agent_permission
BEFORE INSERT ON bookings
FOR EACH ROW
BEGIN
  DECLARE permitted INT DEFAULT 0;

  -- 检查是否存在有效的“book”权限
  SELECT 1 INTO permitted
  FROM agent_unit_permissions aup
  WHERE aup.agent_id = NEW.agent_id
    AND aup.unit_id  = NEW.unit_id
    AND aup.access   = 'book'
    AND aup.is_allowed = 1
    AND (aup.start_at IS NULL OR aup.start_at <= NEW.reserved_at)
    AND (aup.end_at   IS NULL OR aup.end_at   >= NEW.reserved_at)
  LIMIT 1;

  IF permitted IS NULL OR permitted = 0 THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Agent is not permitted to book this unit';
  END IF;
END$$
DELIMITER ;