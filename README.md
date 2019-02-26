# compress-image
Compress an image in JavaScript

## What it does
This code was made to reduce a file input size before send it to the server. It uses canvas and blob to lower image quality. You can choose the quality level so feel free to test different values and see the result.

## Installation
Include `compress-image.js` in your project, with the path of the folder in which this file is located.
```html
<script src="compress-image.js"></script>
```

## Usage
First of all, declare a new **CompressImage** object :
```javascript
const ci = new CompressImage();
```
This object give you access to the **compress** function, which takes an object in parameter.
```javascript
ci.compress(
{
	image: , 	//The file you want to compress
	quality: , 	//Image quality, a number between 0 and 1 (default 0.5)
	success: , 	//Callback function, takes compressed image as parameter
	error: 		// Callback function when en error occurs, takes the error in parameter
});
```
The image should come from a file input.
Compressed image will be returned in the success callback function.

## Example

### index.html
```html
<script src="compress-image.js"></script>
<script src="script.js"></script>

<input type="file" id="file" accept=".png, .jpeg, .jpg" multiple onchange="compress_file(this)"/>             
```

### script.js
```javascript
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
```
## Licence
This project is licensed under the MIT License - see the [LICENSE](https://github.com/ClementCaillaud/compress-image/blob/master/LICENSE) file for details.
Feel free to modify and improve this script.
