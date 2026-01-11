export const CameraView = 'CameraView';
export const useCameraPermissions = jest.fn(() => [
  { granted: true, canAskAgain: true, status: 'granted' },
  jest.fn(),
]);
export const BarcodeScanningResult = {};
