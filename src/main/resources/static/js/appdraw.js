var appdraw = (function () {

    return {

        drawNewPoint: function (canvas2d, pointx, pointy, newpointx, newpointy){
            console.log("inicio AppDraw");
            if(pointx == -2 && pointy == -2){
                console.log("Caso Especial");
                canvas2d.moveTo(newpointx,newpointy);
            } else {
                canvas2d.lineTo(newpointx, newpointy);
                canvas2d.stroke();
            }
            //canvas2d.moveTo(actualPointX, actualPointY);


            console.log("Puntos capturados")
            console.log(newpointx);
            console.log(newpointy);


        }
    }
})();