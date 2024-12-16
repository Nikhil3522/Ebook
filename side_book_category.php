<div class="col-lg-3 col-12 order-2 order-lg-1 md-mt-40 sm-mt-40">
    <div class="shop__sidebar">
        <!-- Start Single Widget -->
        <aside class="widget search_widget">
            <h3 class="widget__title">Search</h3>
            <form mrthod="GET" action="search.php">
                <div class="form-input" style="display: flex;margin-bottom: 20px;border: 1px solid #c6c6c6;justify-content: space-between;padding: 0px 5px;">
                    <input type="text" placeholder="Search..." name="search_key" style="height: 30px;border: navajowhite;width: 100%;" required>
                    <button style="border: none;background: none;">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </form>
        </aside>
        <!-- End Single Widget -->
        <aside class="widget__categories products--cat" style="margin-top: 40px;">
            <h3 class="widget__title">Book Categories</h3>
           
            <ul>
                <li>
                    <a href="category.php?category_id=<?php echo $category_id; ?>" >
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
        <aside class="widget__categories products--tag">
            <h3 class="widget__title">Tags</h3>
            <ul>
                <li><a href="#">Biography</a></li>
                <li><a href="#">Business</a></li>
                <li><a href="#">Cookbooks</a></li>
                <li><a href="#">Health & Fitness</a></li>
                <li><a href="#">History</a></li>
                <li><a href="#">Mystery</a></li>
                <li><a href="#">Inspiration</a></li>
                <li><a href="#">Religion</a></li>
                <li><a href="#">Fiction</a></li>
                <li><a href="#">Fantasy</a></li>
                <li><a href="#">Music</a></li>
                <li><a href="#">Toys</a></li>
                <li><a href="#">Hoodies</a></li>
            </ul>
        </aside>
    </div>
</div>