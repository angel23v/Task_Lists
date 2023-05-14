<?php
    
    $tarea = "";
    if (!empty($_POST["cajatask"]))
    {
        $tarea = $_POST["cajatask"];
    }

    $contenido="
Tarea : $tarea
";

if (file_exists("datos.txt")){
    $archivo = fopen("datos.txt", "a");
    fwrite($archivo, PHP_EOL ."$contenido");
    fclose($archivo);
    }
    else{
    $archivo = fopen("datos.txt", "w");
    fwrite($archivo, PHP_EOL ."$contenido");
    fclose($archivo);
    }

?>
