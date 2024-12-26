import React from 'react';

const Faq = () => {
    return (
        <div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="faq-accordion" defaultChecked />
                <div className="collapse-title text-xl font-medium">What is Roomify?</div>
                <div className="collapse-content">
                    <p>Roomify is a modern hotel booking platform that allows users to search, book, and manage hotel reservations with ease.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-xl font-medium">How do I book a hotel?</div>
                <div className="collapse-content">
                    <p>You can book a hotel by searching for available hotels, selecting your preferred hotel, and completing the booking form.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-xl font-medium">Can I manage my bookings?</div>
                <div className="collapse-content">
                    <p>Yes, you can manage your bookings through the 'My Bookings' section after logging into your account.</p>
                </div>
            </div>
        </div>
    );
};

export default Faq;