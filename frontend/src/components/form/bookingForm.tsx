
import React, { useState } from 'react'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import './bookingForm.css'
import axios from 'axios';


interface BookingFormProps {
  onClose?: () => void;
  selectedUnit?: any;
  onBookingSuccess?: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onClose, selectedUnit, onBookingSuccess }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState<string | undefined>()
  const [fee, setFee] = useState('')
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || !isValidPhoneNumber(phone)) {
      alert('Please enter a valid phone number.');
      return;
    }

    const submitBooking = async () => {
      const selectedUnitId = selectedUnit ? selectedUnit.id : null;
      if (!selectedUnitId) {
        alert('No unit selected for booking.');
        return;
      }
      try {
        const response = await axios.post(apiUrl + 'bookings', {
          unit_id: selectedUnitId,
          agent_id: 1, // Hardcoded agent ID for simplicity
          amount: parseFloat(fee),
          notes: 'Booking made via frontend testing',
          buyer: {
            name: name,
            email: email,
            phone: phone
          }
        });

        if (response.status === 201) {
          alert('Booking successful!');
          if (onBookingSuccess) onBookingSuccess();
          if (onClose) onClose();
        } else {
          alert('Booking failed. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting booking:', error);
        alert('An error occurred while submitting the booking. Please try again.');
      }
    }

    submitBooking();
  }

  return (
    <div className="booking-overlay">
      <div className="booking-form-modal">
        <form className="booking-form" onSubmit={handleSubmit}>
          <div>
            <label>Buyer Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone</label>
            <PhoneInput
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}
              defaultCountry="MY"
              required
            />
          </div>
          <div>
            <label>Booking Fee</label>
            <input
              type="number"
              value={fee}
              onChange={e => setFee(e.target.value)}
              required
              min="0"
            />
          </div>
          <button type="submit">Submit</button>
          <button type="button" className="booking-cancel" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  )
}

export default BookingForm