<?php
/**
 * mock_data.php
 * Generate mock data for apartment booking schema
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT,INSERT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = "vrtech.my";
$user = "vrtechmy_goprop_admin";
$pass = "goprop_admin"; // 改成你的数据库密码
$db = "vrtechmy_simple_booking"; // 确保数据库已创建

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// ---------------------------
// 1. 插入 Developer
// ---------------------------
$developerName = "Z Developer";
$conn->query("INSERT INTO developers (name) VALUES ('$developerName')");
$developerId = $conn->insert_id;

// ---------------------------
// 2. 插入 Project
// ---------------------------
$projectName = "Project A";
$year = 2028;
$address = "Address 1, Address 2, Postcode";

$stmt = $conn->prepare("INSERT INTO projects (name, developer_id, estimate_complete_year, address) VALUES (?, ?, ?, ?)");
$stmt->bind_param("siss", $projectName, $developerId, $year, $address);
$stmt->execute();
$projectId = $stmt->insert_id;
$stmt->close();

// ---------------------------
// 3. 插入 Levels & Units
// ---------------------------
$totalLevels = 50;
$unitsPerLevel = 4;

$statuses = ["available", "locked", "blocked", "sold"];

for ($level = 1; $level <= $totalLevels; $level++) {
    // 插入楼层
    $stmt = $conn->prepare("INSERT INTO levels (project_id, level_number) VALUES (?, ?)");
    $stmt->bind_param("ii", $projectId, $level);
    $stmt->execute();
    $levelId = $stmt->insert_id;
    $stmt->close();

    // 插入该楼层的单位
    for ($unit = 1; $unit <= $unitsPerLevel; $unit++) {
        $unitNumber = $level . "-" . str_pad($unit, 2, "0", STR_PAD_LEFT);
        $size = rand(800, 1200); // 面积随机 800-1200 sqft
        $price = $size * 1000;   // 简单假设：面积 * 1000 = 价格
        $status = $statuses[array_rand($statuses)];

        $stmt = $conn->prepare("INSERT INTO units (level_id, unit_number, size_sqft, price, status) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("isiis", $levelId, $unitNumber, $size, $price, $status);
        $stmt->execute();
        $stmt->close();
    }
}

echo "Mock data inserted successfully!\n";

$conn->close();
