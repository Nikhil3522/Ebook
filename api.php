<?php
// ini_set('display_errors', 1);
// error_reporting(E_ALL);

include('cons.php');
$function_name = $_GET['function_name'] ? $_GET['function_name'] : $_GET['func'];


if($_SESSION['user_id']){
    $user_id = $_SESSION['user_id'];
}

// $user_id = 1;


switch ($function_name) {
    case 'ADD_USER':

        $msisdn = $_GET['msisdn'];

        $query = "SELECT * from user where msisdn = '$msisdn'";
        $result = $conn->query($query);

        if($result->num_rows > 0){

            $user_data = $result->fetch_assoc();
            $_SESSION['user_id'] = $user_data['id'];

        }else{
            $query = "INSERT INTO user (msisdn) VALUES ('$msisdn')";
            $insert_data = $conn->query($query);

            if ($insert_data) {
                // Get the auto-incremented ID of the newly inserted row
                $new_id = $conn->insert_id;
                $_SESSION["user_id"] = $new_id;
                setcookie('user_id', $new_id, time() + (60*60*24*365),'/');
            } else {
                // Handle the error if the query fails
                echo "Error in query: " . $conn->error;
            }
        }
        
        header('Location: index.php');
        break;
    case 'load_ebook':
        $offset = intval($_GET['offset']); // Ensure offset is an integer
        $language = $_GET['language'];
        $language_condition = "";

        if(isset($_GET['language']) && $_GET['language'] != NULL && $_GET['language'] != "All"){
            $language_input = $_GET['language'];
            $language_condition = "ebook.lang = '$language_input' AND";
        }


        if(isset($_GET['category_id']) && $_GET['category_id'] != NULL){
            $category_id = $_GET['category_id'];
            $stmt = $conn->prepare("SELECT ebook.*, favourite.book_id FROM ebook LEFT JOIN favourite ON ebook.id = favourite.book_id  AND favourite.user_id = $user_id WHERE $language_condition ebook.active = 1 AND FIND_IN_SET(?, ebook.cat_id) LIMIT 9 OFFSET ?");
            $stmt->bind_param('ii', $category_id, $offset);
        }else{
            $stmt = $conn->prepare("SELECT ebook.*, favourite.book_id FROM ebook LEFT JOIN favourite ON ebook.id = favourite.book_id  AND favourite.user_id = $user_id WHERE $language_condition ebook.active = 1 LIMIT 9 OFFSET ?");
            $stmt->bind_param('i', $offset);
        }

        $stmt->execute();
        
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        
        echo json_encode($data);

        break;
    case 'add_favourite':
        $book_id = $_GET['book_id'];

        $query = "INSERT INTO favourite(user_id, book_id) VALUE('$user_id', '$book_id');";
        $conn->query($query);

        echo "SUCCESS";
        break;
    case 'remove_favourite':
        $book_id = $_GET['book_id'];

        $query = "DELETE FROM favourite WHERE book_id = $book_id AND user_id = $user_id LIMIT 1";
        $conn->query($query);

        echo "SUCCESS";
        break;
    case 'load_podcast':
        $offset = intval($_GET['offset']); // Ensure offset is an integer
        $file_name = $_GET['filename'];

        if($file_name === "podcast.php"){
            $table_name = " pulse.podcast ";
        }else{
            $table_name = " audiobook.audiobook ";
        }

        if(isset($_GET['category_id']) && $_GET['category_id'] != NULL){
            $category_id = $_GET['category_id'];

            $query = "SELECT 
                        A.id, 
                        A.title, 
                        A.description, 
                        A.thumbnail, 
                        B.audio_url
                    FROM 
                        $table_name AS A
                    LEFT JOIN 
                        $table_name AS B 
                    ON 
                        B.parent_id = A.id AND B.season = 1 AND B.episode = 1
                    WHERE 
                        A.parent_id = 0 AND A.active = 1 AND FIND_IN_SET(?, A.cat_id)
                    LIMIT 9 OFFSET ?;";
            $stmt = $conn->prepare($query);
            $stmt->bind_param('ii', $category_id, $offset);
        }else{
            $query = "SELECT 
                        A.id, 
                        A.title, 
                        A.description, 
                        A.thumbnail, 
                        B.audio_url
                    FROM 
                        $table_name AS A
                    LEFT JOIN 
                        $table_name AS B 
                    ON 
                        B.parent_id = A.id AND B.season = 1 AND B.episode = 1
                    WHERE 
                        A.parent_id = 0 AND A.active = 1
                    LIMIT 9 OFFSET ?;";
            $stmt = $conn->prepare($query);
            $stmt->bind_param('i', $offset);
        }

        $stmt->execute();
        
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        
        echo json_encode($data);

        break;
    case 'req_book':
        $book_name = $_GET['book_name'];

        $query = "INSERT INTO requested_book(title) VALUES(?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('s', $book_name);
        $stmt->execute();

        echo "SUCCESS";

        header('location: index.php');
        exit;
        break;
    case 'load_podcast_episodes':
        $podcast_parent_id = $_GET['podcast_parent_id'];
        $file_name = $_GET['filename'];

        if($file_name === "podcast.php"){
            $table_name = " pulse.podcast ";
        }else{
            $table_name = " audiobook.audiobook ";
        }

        $stmt = $conn->prepare("SELECT id, title, audio_url, season, episode FROM $table_name WHERE parent_id = ?");
        $stmt->bind_param('i', $podcast_parent_id);
        $stmt->execute();
        
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        
        echo json_encode($data);
    default:
        # code...
        break;
}

?>