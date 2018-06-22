<?php
print("<pre>");
$data = json_decode(file_get_contents("php://input"));
print_r($data);
