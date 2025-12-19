<?php
require_once "db_connect.php";

/* Simple OOP class (nice for rubric) */
class Booking {
    public $id, $name, $phone, $service, $date, $notes;

    public function __construct($row) {
        $this->id = $row["booking_id"];
        $this->name = $row["customer_name"];
        $this->phone = $row["phone"];
        $this->service = $row["service_name"];
        $this->date = $row["booking_date"];
        $this->notes = $row["notes"];
    }
}

$rows = [];
$res = $conn->query("SELECT * FROM bookings ORDER BY booking_id DESC");
while ($r = $res->fetch_assoc()) {
    $rows[] = new Booking($r);
}

function renderBookingsTable($bookings) {
    foreach ($bookings as $b) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars($b->id) . "</td>";
        echo "<td>" . htmlspecialchars($b->name) . "</td>";
        echo "<td>" . htmlspecialchars($b->phone) . "</td>";
        echo "<td>" . htmlspecialchars($b->service) . "</td>";
        echo "<td>" . htmlspecialchars($b->date) . "</td>";
        echo "<td>" . htmlspecialchars($b->notes ?? "") . "</td>";
        echo "</tr>";
    }
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <title>All Bookings</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="bg-light">
    <?php include "navbar.php"; ?>
<div class="container my-4">
  <h2 class="mb-3">All Bookings (SELECT from MySQL)</h2>

  <div class="mb-3">
    <a class="btn btn-primary" href="../book.html">Add New Booking</a>
    <a class="btn btn-outline-primary ms-2" href="../bookings.html">Delete Booking</a>
  </div>

  <table class="table table-bordered table-striped">
    <thead class="table-primary">
      <tr>
        <th>ID</th>
        <th>Customer</th>
        <th>Phone</th>
        <th>Service</th>
        <th>Date</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <?php renderBookingsTable($rows); ?>
    </tbody>
  </table>
</div>
</body>
</html>
<?php $conn->close(); ?>
