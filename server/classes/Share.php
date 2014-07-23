<?php
/**
 * Created by PhpStorm.
 * User: colinjlacy
 * Date: 7/18/14
 * Time: 3:09 PM
 */

namespace classes;

require_once "Data.php";

class Share extends Data {

    public function user_exists($email) {

        $sql = "SELECT * FROM Users WHERE email = '$email'";

        $test_result = $this->select($sql);

        // set an empty variable that will contain test results
        $exists = mysqli_fetch_assoc($test_result);

        // if the result of the string is false
        if (!$exists) {

            return false;

        } else {

            return $exists;

        }

    }

    public function set_holding($email, $list, $creator_id, $creator_display) {

        $insert = "INSERT INTO Sharing (list_id, creator_id, creator_display, email) VALUES ($list, '$creator_id', '$creator_display', '$email')";

        // connect to the database
        $share_added = $this->insert($insert);

        // if that worked
        if ($share_added) {
            // you're done here
            return "Share was successful!";
        } else {
            // if not, let someone know
            return "something went wrong while attempting to share with that user";
        }

    }

    public function add_to_share_list($email, $shared_lists, $list) {

        if ($shared_lists != null) {
            $lists = unserialize($shared_lists);
        } else {
            $lists = [];
        }

        array_push($lists, $list);

        $updated_lists = serialize($lists);

        $update = "UPDATE Users SET edit_access = '$updated_lists' WHERE email = '$email'";

        $share_update = $this->update($update);

        if ($share_update) {

            return true;

        } else {

            return false;

        }

    }

} 