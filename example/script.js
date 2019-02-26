function compress_file(input)
{
	//Get the files from the input
	var files = input.files;
	var l = files.length;

	//Create CompressImage object
	const ci = new CompressImage();

	//Loop for each image from the input
	for(var i = 0; i < l; i++)
	{
		var picture = files[i];

		//Compress picture with a quality of 0.5
		ci.compress(
		{
			image: picture,
			quality: 0.5,
			success: function(compressedPicture)
			{
        console.log(compressedPicture);
			  //DO SOMETHING
			},
			error: function(e)
			{
			  console.log(e);
			  //OR DO SOMETHING ELSE
			}
		});

	}
}
