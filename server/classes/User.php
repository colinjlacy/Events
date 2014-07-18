<?php
/**
 * Created by PhpStorm.
 * User: colinjlacy
 * Date: 7/7/14
 * Time: 10:15 AM
 */

namespace classes;

require_once "Data.php";

class User extends Data {

    public function set_user($google_id, $email, $display_name) {

        // create a query that checks whether or not the user exists in the database
        $sql = "SELECT * FROM Users WHERE google_id = $google_id";

        // make the database connection
        $test_result = $this->select($sql);

        // set an empty variable that will contain test results
        $exists = mysqli_fetch_assoc($test_result);

        // if the result of the string is false
        if (!$exists) {

            // create the query that will insert the Google ID and email address into the database
            $insert = "INSERT INTO Users (google_id, email, display_name) VALUES ($google_id, '$email', '$display_name')";

            // connect to the database
            $user_added = $this->insert($insert);

            // if that worked
            if ($user_added) {
                // you're done here
                return "User added!";
            } else {
                // if not, let someone know
                return "something went wrong while inserting the user into the database";
            }

        } else {

            // you're done here
            return "User data retrieved! Google ID:" . $exists['google_id'] . "; Email: " . $exists['email'];

        }

    }

}