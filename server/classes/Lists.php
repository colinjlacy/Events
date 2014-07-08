<?php
/**
 * Created by PhpStorm.
 * User: colinjlacy
 * Date: 7/7/14
 * Time: 12:47 PM
 */

namespace classes;

require_once "Data.php";

class Lists extends Data {

    public function get_lists($google_id) {

        // create a query that retrieves all lists from the database
        $sql = "SELECT * FROM Lists WHERE google_id = $google_id";

        // execute the query and save the returned object
        $list_query = $this->select($sql);

        // if no returned object
        if(!$list_query) {

            // let somebody know
            die('Could not retrieve list data');

        // if there is a returned object
        } else {

            // create a blank array
            $dataToBeEncoded = array();

            // loop through each row in the returned object
            while($row = $list_query -> fetch_assoc()) {

                // and insert it into the blank array
                $dataToBeEncoded[] = $row;

            }

            // then return a json_encoded version of the data to the app
            return json_encode($dataToBeEncoded);

        }

    }

    public function get_items($list_id) {

        // create a query that checks whether or not the user exists in the database
        $sql = "SELECT * FROM List_Items WHERE list_id = '$list_id'";

        // execute the query and save the returned object
        $list_query = $this->select($sql);

        // if no returned object
        if(!$list_query) {

            // let somebody know
            die('Could not retrieve data ' . mysqli_error($con));

            // if there is a returned object
        } else {

            // create a blank array
            $dataToBeEncoded = array();

            // loop through each row in the returned object
            while($row = $list_query -> fetch_assoc()) {

                // and insert it into the blank array
                $dataToBeEncoded[] = $row;

            }

            // then return a json_encoded version of the data to the app
            return json_encode($dataToBeEncoded);

        }

    }

    public function create_list($google_id, $title, $category, $items) {

        // determine if we're going to be adding a category to this list
        if (isset($category)) {

            // if there is a category set, map it to the insert values
            $insert = "INSERT INTO Lists (google_id, title, category) VALUES ($google_id, '$title', '$category')";

        } else {

            // if not, map insert values without it
            $insert = "INSERT INTO Lists (google_id, title) VALUES ($google_id, '$title')";

        }

        $insert_list = $this->insert($insert);

        if(!$insert_list) {

            // let somebody know
            die('Could not insert list');

        // if there is a returned object
        } else {

            // use the list's database id to execute the add_items() function
            $this->add_items($insert_list, $items);

            return $insert_list;

        }

    }

    public function add_items($list_id, $items) {

        // create the database query that will insert list items into the database
        $insert = "INSERT INTO List_Items (list_id, name) VALUES ";

        // set an iterator as 1 (not 0 because I want the loop to match the count - not index - of the array item)
        $i = 1;

        // get the count of items
        $count = count($items);

        // loop through the items, adding each to the query string
        foreach($items as $item) {

            // escape any gamebreaking characters
            $item = mysql_real_escape_string($item);

            // append item info to the query, along with the relational grocery_list id
            $insert .= "('$list_id', '$item')";

            // if the incremented value is still less than the count of the items array, add some string glue
            if ($i < $count) {
                $insert .= ", ";
            }

            // increment
            $i++;

        }

        $insert_items = $this->insert($insert);

        if(!$insert_items) {

            // let somebody know
            die('Could not insert items');

            // if there is a returned object
        }

    }

}