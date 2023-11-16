<?php

//var_dump($_POST);
//die();
if(isset($_POST["user"])){
    if($_POST["user"] == "angel"){
        $user = $_POST["user"];
        $password = $_POST["password"];
        $respuesta = $password == "password" ? "Bienvenido" : "Error al iniciar sesion";
        echo json_encode($respuesta);
    }else{
        $respuesta = "Ingreser sus datos corecatemnte";
        echo json_encode($respuesta);
    }
}

if(isset($_POST["nombre"])){
    $nombre = $_POST["nombre"];
    $apellidos = $_POST["apellidos"];
    $correo = $_POST["correo"];
    $password = $_POST["password"];

    $respuesta = "Registro Exitoso";
    echo json_encode($respuesta);
}



?>