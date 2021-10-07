var appdraw = (function () {
    let actualPointX=-1;
    let actualPointY=-1;
    return {

        drawNewPoint: function (canvas2d, pointx, pointy, newpointx, newpointy){
            console.log("inicio AppDraw");
            if(actualPointX == -1 && actualPointY == -1){
                actualPointX = pointx;
                actualPointY = pointy;
            }
            //canvas2d.moveTo(actualPointX, actualPointY);
            canvas2d.lineTo(newpointx, newpointy);
            canvas2d.stroke();
            console.log(actualPointX);
            console.log(actualPointY);
            console.log("Puntos capturados")
            console.log(newpointx);
            console.log(newpointy);
            actualPointX = newpointx;
            actualPointY = newpointy;

        }
    }
})();