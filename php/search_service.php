<?php
require_once "db_connect.php";

$q = trim($_GET["q"] ?? "");
$results = [];

if ($q !== "") {
    $stmt = $conn->prepare("SELECT * FROM services WHERE service_name LIKE CONCAT('%', ?, '%')");
    $stmt->bind_param("s", $q);
    $stmt->execute();
    $res = $stmt->get_result();

    while ($row = $res->fetch_assoc()) {
        $results[] = $row;
    }
    $stmt->close();
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <title>Search Services</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="bg-light">
    <?php include "navbar.php"; ?>
<div class="container my-4">
  <h2 class="mb-3">Search Services (SELECT)</h2>

  <form method="get" action="search_service.php" class="row g-2 mb-3">
    <div class="col-md-6">
      <input class="form-control" type="text" name="q" value="<?php echo htmlspecialchars($q); ?>"
             placeholder="Type service name (e.g. Wash, Laundry)">
    </div>
    <div class="col-md-3">
      <button class="btn btn-primary">Search</button>
      <a class="btn btn-outline-secondary ms-2" href="../bookings.html">Back</a>
    </div>
  </form>

  <?php if ($q === ""): ?>
    <div class="alert alert-info">Enter a keyword to search for services.</div>
  <?php else: ?>
    <h5 class="mb-2">Results for: "<?php echo htmlspecialchars($q); ?>"</h5>

    <table class="table table-bordered table-striped">
      <thead class="table-primary">
        <tr>
          <th>Service ID</th>
          <th>Service Name</th>
          <th>Base Price</th>
        </tr>
      </thead>
      <tbody>
      <?php if (count($results) === 0): ?>
        <tr><td colspan="3">No services found.</td></tr>
      <?php else: ?>
        <?php foreach ($results as $r): ?>
          <tr>
            <td><?php echo htmlspecialchars($r["service_id"]); ?></td>
            <td><?php echo htmlspecialchars($r["service_name"]); ?></td>
            <td><?php echo htmlspecialchars($r["base_price"]); ?></td>
          </tr>
        <?php endforeach; ?>
      <?php endif; ?>
      </tbody>
    </table>
  <?php endif; ?>
</div>
</body>
</html>
<?php $conn->close(); ?>
