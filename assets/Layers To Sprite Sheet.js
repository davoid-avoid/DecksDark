if (documents.length > 0) 
{
	docRef = activeDocument;    
	var activeLayer = docRef.activeLayer;

	numLayers = docRef.artLayers.length; 	
	var cols = docRef.width;
	
 	var spriteX = docRef.width;

	app.preferences.rulerUnits = Units.PIXELS;

 	newX = numLayers * spriteX;
 	
 	docRef.resizeCanvas( newX, docRef.height, AnchorPosition.TOPLEFT );
 	 	
	// move the layers around
 	for (i = 0; i <= numLayers; i++)
 	{ 	
 		docRef.artLayers[i].visible = 1;
 		
  		var movX = spriteX*(numLayers - (i + 1));

 		docRef.artLayers[i].translate(movX, 0);
 		
  	}
}