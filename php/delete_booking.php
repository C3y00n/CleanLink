<?php
require_once "db_connect.php";

$bookingId = trim($_POST["booking_id"] ?? "");

if ($bookingId === "" || !ctype_digit($bookingId)) {
    die("Error: Invalid booking ID.");
}

$stmt = $conn->prepare("DELETE FROM bookings WHERE booking_id = ?");
$stmt->bind_param("i", $bookingId);
$stmt->execute();
$deletedRows = $stmt->affected_rows;
$stmt->close();
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <title>Delete Booking</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="bg-light">
    <?php include "navbar.php"; ?>
<div class="container my-4">
  <h2 class="mb-3">Delete Booking</h2>

  <?php if ($deletedRows > 0): ?>
    <div class="alert alert-success">Booking ID <?php echo htmlspecialchars($bookingId); ?> deleted successfully ✅</div>
  <?php else: ?>
    <div class="alert alert-warning">No booking found with ID <?php echo htmlspecialchars($bookingId); ?> ⚠</div>
  <?php endif; ?>

  <a class="btn btn-primary" href="../bookings.html">Back</a>
  <a class="btn btn-outline-primary ms-2" href="view_bookings.php">View All Bookings</a>
</div>
</body>
</html>
<?php $conn->close(); ?>
