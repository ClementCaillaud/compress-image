/**
 * @description Compress an image
 * @author Clément CAILLAUD
 */

function CompressImage()
{
  /* PUBLIC */

  /**
   * Compress an image
   * @param  {Object}   param     image     :   File      ->  the image we compress,
   *                              quality   :   number    ->  the quality of the compressed image, float between 0 and 1 (default 0.5)
   *                              success   :   function  ->  the function to call when process is done, take the compressed image as parameter
   *                              error     :   function  ->  the function to call when we got error, take the error feedback in parameter
   */
  this.compress = function(param)
  {
    try
    {
      param = checkParam(param);
      startCompress(param.image, param.quality, param.success);
    }
    catch (e)
    {
      if(typeof param.error === 'function')
      {
        param.error(e);
      }
    }
  };

  /* PRIVATE */

  /**
   * Check parameters and set default, or throw exception if there is error
   * @param  {object} param Object containing parameters
   * @return {object}       Parameters with correct values
   */
  var checkParam = function(param)
  {
    // Check if param is an Object
    if( typeof param !== 'object' )
    {
      throw Error('Param in compress function is not an object. It should be like {image : File, [optional] minWidth : Number, [optional] divScale : Number}, success : Function, error : Function');
    }

    // Check if image is a File
    if( !param.image instanceof File )
    {
      throw Error('Image in compress function is not a File object');
    }

    // Check if quality is a number between 0 and 1, default 0.5
    if( typeof param.quality === 'number' )
    {
      if( param.quality < 0 || param.quality > 1 )
      {
        throw Error('Quality must be between 0 and 1');
      }
    }
    else
    {
      param.quality = 0.5;
    }

    return param;
  };

  /**
   * Start image compression
   * @param  {File}     image     Image to compress
   * @param  {Number}   quality   The quality of the image (0 ~ 1)
   * @param  {Function} success   The function to be called when process ending
   */
  var startCompress = function(image, quality, success)
  {
    const reader = new FileReader();
    reader.readAsDataURL(image);

    //Read File
    reader.onload = function(event)
    {
      const img = new Image();
      img.src = event.target.result;

      //Read image from file
      img.onload = function()
      {
        const elem = document.createElement('canvas');
        elem.width = img.width;
        elem.height = img.height;

        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, elem.width, elem.height);

        //toBlob polyfill
        if( !HTMLCanvasElement.prototype.toBlob )
        {
          Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob',
          {
            value: function (callback, type, quality)
            {
              var dataURL = this.toDataURL(type, quality).split(',')[1];
              setTimeout(function()
              {
                var binStr = atob( dataURL ),
                    len = binStr.length,
                    arr = new Uint8Array(len);
                for (var i = 0; i < len; i++ )
                {
                  arr[i] = binStr.charCodeAt(i);
                }
                callback( new Blob( [arr], {type: type || 'image/' + type} ) );
              });
            }
          });
        }

        //Create the compressed file
        ctx.canvas.toBlob(function(blob)
        {
          var compressedImage = blob;
          compressedImage.name = image.name;
          compressedImage.type = image.type;
          compressedImage.lastModified = Date.now();

          if(typeof success === "function")
          {
            success(compressedImage);
          }

        }, image.type, quality);
      };
    };
  };
}
