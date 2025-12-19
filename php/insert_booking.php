<?php
require_once "db_connect.php";

$name    = trim($_POST["customer_name"] ?? "");
$phone   = trim($_POST["phone"] ?? "");
$service = trim($_POST["service_name"] ?? "");
$date    = trim($_POST["booking_date"] ?? "");
$notes   = trim($_POST["notes"] ?? "");

if ($name === "" || $phone === "" || $service === "" || $date === "") {
    die("Error: Missing required fields.");
}

$stmt = $conn->prepare("INSERT INTO bookings (customer_name, phone, service_name, booking_date, notes)
                        VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $name, $phone, $service, $date, $notes);
$stmt->execute();

$insertedId = $stmt->insert_id;
$stmt->close();

$result = $conn->query("SELECT * FROM bookings WHERE booking_id = $insertedId");
$row = $result->fetch_assoc();
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <title>Booking Inserted</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="bg-light">
    <?php include "navbar.php"; ?>

<div class="container my-4">
  <h2 class="mb-3">Booking Inserted Successfully ✅</h2>

  <table class="table table-bordered table-striped">
    <thead class="table-primary">
      <tr>
        <th>Booking ID</th>
        <th>Customer Name</th>
        <th>Phone</th>
        <th>Service</th>
        <th>Date</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><?php echo $row["booking_id"]; ?></td>
        <td><?php echo htmlspecialchars($row["customer_name"]); ?></td>
        <td><?php echo htmlspecialchars($row["phone"]); ?></td>
        <td><?php echo htmlspecialchars($row["service_name"]); ?></td>
        <td><?php echo htmlspecialchars($row["booking_date"]); ?></td>
        <td><?php echo htmlspecialchars($row["notes"] ?? ""); ?></td>
      </tr>
    </tbody>
  </table>

  <a class="btn btn-primary" href="../book.html">Back to Booking Form</a>
  <a class="btn btn-outline-primary ms-2" href="view_bookings.php">View All Bookings</a>
</div>
</body>
</html>
<?php $conn->close(); ?>
