CREATE DATABASE IF NOT EXISTS cleanlink_db;
USE cleanlink_db;

DROP TABLE IF EXISTS services;
CREATE TABLE services (
  service_id INT AUTO_INCREMENT PRIMARY KEY,
  service_name VARCHAR(50) NOT NULL,
  base_price DECIMAL(10,2) NOT NULL
);

DROP TABLE IF EXISTS providers;
CREATE TABLE providers (
  provider_id INT AUTO_INCREMENT PRIMARY KEY,
  provider_name VARCHAR(60) NOT NULL,
  phone VARCHAR(20) NOT NULL
);

DROP TABLE IF EXISTS bookings;
CREATE TABLE bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(60) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service_name VARCHAR(50) NOT NULL,
  booking_date DATE NOT NULL,
  notes VARCHAR(200) NULL
);

INSERT INTO services (service_name, base_price) VALUES
('Car Wash', 5.00),
('Deep Car Wash', 10.00),
('Laundry', 6.00),
('Home Cleaning', 12.00),
('Ironing', 4.00);

INSERT INTO providers (provider_name, phone) VALUES
('SparkClean', '99911122'),
('QuickWash', '99887766'),
('FreshFold', '91234567'),
('ShinePro', '92345678'),
('HomeCare+', '93456789');

INSERT INTO bookings (customer_name, phone, service_name, booking_date, notes) VALUES
('Ammar', '91234567', 'Car Wash', '2025-11-10', 'Sedan'),
('Hood', '92345678', 'Laundry', '2025-11-11', '2 bags'),
('Sara', '93456789', 'Home Cleaning', '2025-11-12', 'Apartment'),
('Ali', '95554433', 'Ironing', '2025-11-13', 'Shirts'),
('Maha', '96667788', 'Deep Car Wash', '2025-11-14', 'SUV');
