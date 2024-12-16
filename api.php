<?php
// ini_set('display_errors', 1);
// error_reporting(E_ALL);

include('cons.php');
$function_name = $_GET['function_name'];
$user_id = 1;

switch ($function_name) {
    case 'load_ebook':
        $offset = intval($_GET['offset']); // Ensure offset is an integer
        if(isset($_GET['category_id']) && $_GET['category_id'] != NULL){
            $category_id = $_GET['category_id'];
            $stmt = $conn->prepare("SELECT ebook.*, favourite.book_id FROM ebook LEFT JOIN favourite ON ebook.id = favourite.book_id  AND favourite.user_id = $user_id WHERE ebook.active = 1 AND FIND_IN_SET(?, ebook.cat_id) LIMIT 9 OFFSET ?");
            $stmt->bind_param('ii', $category_id, $offset);
        }else{
            $stmt = $conn->prepare("SELECT ebook.*, favourite.book_id FROM ebook LEFT JOIN favourite ON ebook.id = favourite.book_id  AND favourite.user_id = $user_id WHERE ebook.active = 1 LIMIT 9 OFFSET ?");
            $stmt->bind_param('i', $offset);
        }

        $stmt->execute();
        
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        
        echo json_encode($data);

        break;
    case 'add_favourite':
        $book_id = $_GET['book_id'];
        $user_id = 1;

        $query = "INSERT INTO favourite(user_id, book_id) VALUE('$user_id', '$book_id');";
        $conn->query($query);

        echo "SUCCESS";
        break;
    case 'remove_favourite':
        $book_id = $_GET['book_id'];
        $user_id = 1;

        $query = "DELETE FROM favourite WHERE book_id = $book_id AND user_id = $user_id LIMIT 1";
        $conn->query($query);

        echo "SUCCESS";
        break;
    case 'load_podcast':
        $offset = intval($_GET['offset']); // Ensure offset is an integer
        if(isset($_GET['category_id']) && $_GET['category_id'] != NULL){
            $category_id = $_GET['category_id'];
            $stmt = $conn->prepare("SELECT * FROM pulse.podcast AS A WHERE A.parent_id <> 0 AND FIND_IN_SET(?, A.cat_id)LIMIT 9 OFFSET ?");
            $stmt->bind_param('i', $offset);
        }else{
            $stmt = $conn->prepare("SELECT * FROM pulse.podcast WHERE parent_id <> 0  LIMIT 9 OFFSET ?");
            $stmt->bind_param('i', $offset);
        }

        $stmt->execute();
        
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        
        echo json_encode($data);

        break;
    default:
        # code...
        break;
}

?>