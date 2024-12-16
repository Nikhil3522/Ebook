<div class="col-lg-3 col-12 order-2 order-lg-1 md-mt-40 sm-mt-40">
    <div class="shop__sidebar">
        <!-- End Single Widget -->
        <aside class="widget__categories products--cat" style="margin-top: 40px;">
            <h3 class="widget__title">Book Categories</h3>
           
            <ul>
                <li>
                    <a 
                        href="category.php?category_id=<?php echo $category_id; ?>" 
                        style="font-weight: <?= $_GET['category_id'] == $category_id ? 'bold' : 'normal' ?>; color: <?= $_GET['category_id'] == $category_id ? '#ef0029' : 'black' ?>"
                        >
                        All
                    </a>
                </li>
                <?php
                    // $query = "SELECT * FROM categories";
                    $query = "SELECT A.*, 
                                (SELECT B.id 
                                FROM ebook AS B 
                                WHERE FIND_IN_SET(A.id, B.cat_id) AND B.active = 1
                                ORDER BY B.id ASC 
                                LIMIT 1) AS book_id
                            FROM categories AS A;";
                    $result = $conn->query($query);
                    while($row = $result->fetch_assoc()){
                        $category_id = $row['id'];
                        $category = $row['category'];
                        $book_id = $row['book_id'];
                ?>
                    <li>
                        <a 
                            <?php echo $book_id === NULL ? '' : 'href="category.php?category_id=' . $category_id . '"'; ?>
                            style="font-weight: <?= $_GET['category_id'] == $category_id ? 'bold' : 'normal' ?>; color: <?= $_GET['category_id'] == $category_id ? '#ef0029' : 'black' ?>">
                            <?php echo $category; ?>
                        </a>
                    </li>
                <?php } ?>
                
            </ul>
        </aside>
    </div>
</div>