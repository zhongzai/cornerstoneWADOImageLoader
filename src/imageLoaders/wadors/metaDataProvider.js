/**
 */
(function (cornerstoneWADOImageLoader) {

  "use strict";

  var getNumberValues = cornerstoneWADOImageLoader.wadors.getNumberValues;
  var getValue = cornerstoneWADOImageLoader.wadors.getValue;

  function getNumberValue(element, index) {
    var value = getValue(element, index);
    if(value === undefined) {
      return;
    }
    return parseFloat(value);
  }

  function metaDataProvider(type, imageId) {
    var metaData = cornerstoneWADOImageLoader.wadors.metaDataManager.get(imageId);
    if(!metaData) {
      return;
    }

    if (type === 'imagePlaneModule') {
      return {
        pixelSpacing: getNumberValues(metaData['00280030'], 2),
        imageOrientationPatient: getNumberValues(metaData['00200037'], 6),
        imagePositionPatient: getNumberValues(metaData['00200032'], 3),
        sliceThickness: getNumberValue(metaData['00180050']),
        sliceLocation: getNumberValue(metaData['00201041'])
      };
    }

    if (type === 'imagePixelModule') {
      return {
        samplesPerPixel: getValue(metaData['00280002']),
        photometricInterpretation: getValue(metaData['00280004']),
        rows: getValue(metaData['00280010']),
        columns: getValue(metaData['00280011']),
        bitsAllocated: getValue(metaData['00280100']),
        bitsStored: getValue(metaData['00280101']),
        highBit: getValue(metaData['00280102']),
        pixelRepresentation: getValue(metaData['00280103']),
        planarConfiguration: getValue(metaData['00280006']),
        pixelAspectRatio: getValue(metaData['00280034']),
        smallestPixelValue: getValue(metaData['00280106']),
        largestPixelValue: getValue(metaData['00280107']),
        // TODO Color Palette
      };
    }

    if (type === 'voiLutModule') {
      return {
        // TODO VOT LUT Sequence
        windowCenter : getNumberValues(metaData['00281050'], 1),
        windowWidth : getNumberValues(metaData['00281051'], 1),
      };
    }

    if (type === 'modalityLutModule') {
      return {
        // TODO VOT LUT Sequence
        rescaleIntercept : getNumberValue(metaData['00281052']),
        rescaleSlope : getNumberValue(metaData['00281053']),
        rescaleType: getValue(metaData['00281054'])
      };
    }
  }

  // module exports
  cornerstoneWADOImageLoader.wadors.metaDataProvider = metaDataProvider

}(cornerstoneWADOImageLoader));