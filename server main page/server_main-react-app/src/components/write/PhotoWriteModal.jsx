import React, { useState, useEffect, useRef } from 'react';
import WriteModal from '../editor/WriteModal';
import TitleInput from '../editor/TitleInput';
import ImageUploader from '../editor/ImageUploader';
import ImageRatioSelector from '../editor/ImageRatioSelector';
import ExifEditor from '../editor/ExifEditor';
import PresetManager from '../editor/PresetManager';
import '../../styles/components/WriteModal.css';
import '../../styles/components/PhotoEditor.css';

const ratioOptions = [
  { value: '1:1', label: '1:1 (정사각형)' },
  { value: '2:1', label: '2:1 (가로 파노라마)' },
  { value: '1:2', label: '1:2 (세로 파노라마)' },
  { value: '3:1', label: '3:1 (와이드 파노라마)' },
  { value: '1:3', label: '1:3 (세로 롱샷)' },
  { value: 'original', label: '원본 비율' }
];

const PhotoWriteModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [selectedRatio, setSelectedRatio] = useState('original');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [exifData, setExifData] = useState({});
  const [editedExif, setEditedExif] = useState({});
  const [presets, setPresets] = useState([]);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imageOrientation, setImageOrientation] = useState('landscape');
  const [originalImageSize, setOriginalImageSize] = useState({ width: 0, height: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [cropSize, setCropSize] = useState({ width: 0, height: 0 });
  const imageContainerRef = useRef(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const cropOverlayRef = useRef(null);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [aspect, setAspect] = useState(4 / 3);
  const dragStartPosition = useRef({ x: 0, y: 0 });
  const cropStartPosition = useRef({ x: 0, y: 0 });
  const resizeHandle = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const imagePos = useRef({ x: 0, y: 0 });

  // 이미지 파일이 변경될 때 EXIF 데이터 추출 및 이미지 방향 감지
  useEffect(() => {
    if (imageFile) {
      // 이미지 미리보기 생성
      const objectUrl = URL.createObjectURL(imageFile);
      setImagePreview(objectUrl);
      
      // 이미지 방향 및 크기 감지
      const img = new Image();
      img.onload = () => {
        const isLandscape = img.width >= img.height;
        setImageOrientation(isLandscape ? 'landscape' : 'portrait');
        setOriginalImageSize({ width: img.width, height: img.height });
        
        // 초기 줌 레벨 설정 (이미지를 컨테이너에 맞게 조정)
        setTimeout(() => {
          updateCropSize();
          calculateAndSetOptimalZoom();
        }, 100);
      };
      img.src = objectUrl;
      
      // EXIF 데이터 추출 (실제 구현에서는 exif-js 같은 라이브러리 사용)
      extractExifData(imageFile).then(data => {
        setExifData(data);
        setEditedExif(data); // 초기 편집 상태는 원본 데이터와 동일
      });
      
      // 크롭 위치 초기화
      setCropPosition({ x: 0, y: 0 });
      
      // 메모리 누수 방지
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFile]);

  // 컨테이너 크기 측정
  useEffect(() => {
    if (imageContainerRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          setContainerSize({ width, height });
        }
      });
      
      resizeObserver.observe(imageContainerRef.current);
      
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [imagePreview]);

  // 크롭 오버레이 크기 업데이트
  const updateCropSize = () => {
    if (!cropOverlayRef.current) return;
    
    const cropRect = cropOverlayRef.current.getBoundingClientRect();
    let cropWidth = cropRect.width;
    let cropHeight = cropRect.height;
    
    // 선택된 비율에 따라 크롭 크기 계산
    if (selectedRatio !== 'original') {
      const [widthRatio, heightRatio] = selectedRatio.split(':').map(Number);
      const ratio = widthRatio / heightRatio;
      
      if (ratio > 1) { // 가로가 더 긴 비율
        cropWidth = cropRect.width;
        cropHeight = cropWidth / ratio;
      } else { // 세로가 더 긴 비율
        cropHeight = cropRect.height;
        cropWidth = cropHeight * ratio;
      }
    }
    
    setCropSize({ width: cropWidth, height: cropHeight });
  };

  // 비율이 변경될 때 이미지 위치 및 줌 조정
  useEffect(() => {
    if (!imagePreview || !originalImageSize.width || !originalImageSize.height || !containerSize.width) return;
    
    updateCropSize();
    
    // 비율에 따라 이미지 위치 및 줌 조정
    calculateAndSetOptimalZoom();
    
  }, [selectedRatio, imagePreview, originalImageSize, containerSize]);

  // 최적의 줌 레벨 계산 및 설정
  const calculateAndSetOptimalZoom = () => {
    if (!originalImageSize.width || !originalImageSize.height) return;
    
    updateCropSize();
    
    // 원본 이미지 비율
    const originalRatio = originalImageSize.width / originalImageSize.height;
    
    // 크롭 영역 비율
    let cropRatio = 16 / 9; // 기본값 (컨테이너 비율)
    
    if (selectedRatio !== 'original') {
      const [widthRatio, heightRatio] = selectedRatio.split(':').map(Number);
      cropRatio = widthRatio / heightRatio;
    } else {
      // 원본 비율인 경우 컨테이너 비율 사용
      cropRatio = containerSize.width / containerSize.height;
    }
    
    let newZoom = 1;
    
    // 이미지 방향과 크롭 방향에 따라 최적의 줌 계산
    if (originalRatio >= cropRatio) {
      // 이미지가 크롭 영역보다 가로로 더 긴 경우
      // 세로를 기준으로 맞춤
      newZoom = cropSize.height / (originalImageSize.height * (containerSize.height / originalImageSize.height));
    } else {
      // 이미지가 크롭 영역보다 세로로 더 긴 경우
      // 가로를 기준으로 맞춤
      newZoom = cropSize.width / (originalImageSize.width * (containerSize.width / originalImageSize.width));
    }
    
    // 최소 줌 레벨 보장 (크롭 영역을 항상 채우도록)
    newZoom = Math.max(newZoom, 1);
    
    setZoomLevel(newZoom);
    setCropPosition({ x: 0, y: 0 }); // 위치 초기화
  };

  // 이미지 위치 바운드 체크 및 조정
  const checkAndAdjustBounds = (position, currentZoom) => {
    if (!imageRef.current || !cropOverlayRef.current) return position;
    
    const imageRect = imageRef.current.getBoundingClientRect();
    const cropRect = cropOverlayRef.current.getBoundingClientRect();
    
    // 이미지 크기 (줌 적용)
    const scaledImageWidth = originalImageSize.width * (containerSize.width / originalImageSize.width) * currentZoom;
    const scaledImageHeight = originalImageSize.height * (containerSize.height / originalImageSize.height) * currentZoom;
    
    // 이미지 중심점
    const imageCenterX = containerSize.width / 2 + position.x * containerSize.width;
    const imageCenterY = containerSize.height / 2 + position.y * containerSize.height;
    
    // 이미지 가장자리 좌표
    const imageLeft = imageCenterX - scaledImageWidth / 2;
    const imageRight = imageCenterX + scaledImageWidth / 2;
    const imageTop = imageCenterY - scaledImageHeight / 2;
    const imageBottom = imageCenterY + scaledImageHeight / 2;
    
    // 크롭 영역 가장자리 좌표
    const cropLeft = cropRect.left - imageContainerRef.current.getBoundingClientRect().left;
    const cropRight = cropRect.right - imageContainerRef.current.getBoundingClientRect().left;
    const cropTop = cropRect.top - imageContainerRef.current.getBoundingClientRect().top;
    const cropBottom = cropRect.bottom - imageContainerRef.current.getBoundingClientRect().top;
    
    let adjustedX = position.x;
    let adjustedY = position.y;
    
    // 가로 바운드 체크
    if (scaledImageWidth <= cropSize.width) {
      // 이미지가 크롭 영역보다 작으면 중앙 정렬
      adjustedX = 0;
    } else {
      // 왼쪽 경계 체크
      if (imageLeft > cropLeft) {
        adjustedX = position.x - (imageLeft - cropLeft) / containerSize.width;
      }
      
      // 오른쪽 경계 체크
      if (imageRight < cropRight) {
        adjustedX = position.x + (cropRight - imageRight) / containerSize.width;
      }
    }
    
    // 세로 바운드 체크
    if (scaledImageHeight <= cropSize.height) {
      // 이미지가 크롭 영역보다 작으면 중앙 정렬
      adjustedY = 0;
    } else {
      // 위쪽 경계 체크
      if (imageTop > cropTop) {
        adjustedY = position.y - (imageTop - cropTop) / containerSize.height;
      }
      
      // 아래쪽 경계 체크
      if (imageBottom < cropBottom) {
        adjustedY = position.y + (cropBottom - imageBottom) / containerSize.height;
      }
    }
    
    return { x: adjustedX, y: adjustedY };
  };

  // 마우스 드래그 시작 핸들러
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY
    };
    imagePos.current = {
      x: cropPosition.x,
      y: cropPosition.y
    };
  };

  // 마우스 드래그 중 핸들러
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;

    // 이미지 경계 체크
    const containerRect = imageContainerRef.current.getBoundingClientRect();
    const imageRect = imageRef.current.getBoundingClientRect();

    let newX = imagePos.current.x + deltaX;
    let newY = imagePos.current.y + deltaY;

    // 이미지가 컨테이너를 벗어나지 않도록 제한
    const maxX = (imageRect.width * zoomLevel - containerRect.width) / 2;
    const maxY = (imageRect.height * zoomLevel - containerRect.height) / 2;

    newX = Math.max(-maxX, Math.min(maxX, newX));
    newY = Math.max(-maxY, Math.min(maxY, newY));

    setCropPosition({ x: newX, y: newY });
  };

  // 마우스 드래그 종료 핸들러
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 마우스 휠 핸들러 (확대/축소)
  const handleWheel = (e) => {
    e.preventDefault();
    
    // 휠 방향에 따라 확대/축소
    const delta = -Math.sign(e.deltaY);
    
    // 줌 감도 조절 (값이 작을수록 천천히 확대/축소)
    const zoomSensitivity = 0.1;
    
    // 새 줌 레벨 계산
    const minZoom = calculateMinZoom();
    const maxZoom = 5.0;
    const newZoom = Math.max(minZoom, Math.min(maxZoom, zoomLevel + delta * zoomSensitivity));
    
    // 줌 레벨 업데이트
    setZoomLevel(newZoom);
    
    // 바운드 체크 및 조정
    const adjustedPosition = checkAndAdjustBounds(cropPosition, newZoom);
    setCropPosition(adjustedPosition);
  };

  // 최소 줌 레벨 계산 (크롭 영역을 항상 채우도록)
  const calculateMinZoom = () => {
    if (!originalImageSize.width || !originalImageSize.height || !cropSize.width || !cropSize.height) return 1;
    
    // 원본 이미지 비율
    const originalRatio = originalImageSize.width / originalImageSize.height;
    
    // 크롭 영역 비율
    let cropRatio = cropSize.width / cropSize.height;
    
    let minZoom = 1;
    
    // 이미지 방향과 크롭 방향에 따라 최소 줌 계산
    if (originalRatio >= cropRatio) {
      // 이미지가 크롭 영역보다 가로로 더 긴 경우
      // 세로를 기준으로 맞춤
      minZoom = cropSize.height / (originalImageSize.height * (containerSize.height / originalImageSize.height));
    } else {
      // 이미지가 크롭 영역보다 세로로 더 긴 경우
      // 가로를 기준으로 맞춤
      minZoom = cropSize.width / (originalImageSize.width * (containerSize.width / originalImageSize.width));
    }
    
    return minZoom;
  };

  // EXIF 데이터 추출 (실제 구현에서는 exif-js 같은 라이브러리 사용)
  const extractExifData = async (file) => {
    // 예시 데이터 (실제로는 파일에서 추출)
    return {
      camera: 'Canon EOS R5',
      lens: 'RF 24-70mm f/2.8L IS USM',
      focalLength: '50mm',
      aperture: 'f/2.8',
      shutterSpeed: '1/200',
      iso: '100'
    };
  };

  // 프리셋 저장
  const savePreset = (name) => {
    const newPreset = {
      id: Date.now().toString(),
      name,
      exif: { ...editedExif },
      cropPosition: { ...cropPosition },
      zoomLevel,
      ratio: selectedRatio
    };
    
    const updatedPresets = [...presets, newPreset];
    setPresets(updatedPresets);
    setSelectedPreset(newPreset.id);
    
    // 실제 구현에서는 로컬 스토리지나 서버에 저장
    localStorage.setItem('photoPresets', JSON.stringify(updatedPresets));
  };

  // 프리셋 로드
  const loadPreset = (presetId) => {
    const preset = presets.find(p => p.id === presetId);
    
    if (preset) {
      setEditedExif(preset.exif);
      setCropPosition(preset.cropPosition);
      setZoomLevel(preset.zoomLevel);
      setSelectedRatio(preset.ratio);
      setSelectedPreset(presetId);
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = () => {
    // 실제 구현에서는 서버에 데이터 전송
    console.log({
      title,
      image: imageFile,
      exif: editedExif,
      cropPosition,
      zoomLevel,
      ratio: selectedRatio
    });
    onClose();
  };

  // 이미지 로드 시 초기 크롭 영역 설정
  const onImageLoad = (e) => {
    const { width, height } = e.target;
    const cropWidth = width;
    const cropHeight = (width / aspect);
    
    setCrop({
      x: 0,
      y: (height - cropHeight) / 2,
      width: cropWidth,
      height: cropHeight
    });
    
    setOriginalImageSize({ width, height });
    calculateInitialZoom();
  };

  // 크롭 영역 드래그 시작
  const onCropMouseDown = (e) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    dragStartPosition.current = { x: clientX, y: clientY };
    cropStartPosition.current = { x: crop.x, y: crop.y };
    
    window.addEventListener('mousemove', onCropMouseMove);
    window.addEventListener('mouseup', onCropMouseUp);
  };

  // 크롭 영역 드래그 중
  const onCropMouseMove = (e) => {
    if (!isDragging) return;

    const { clientX, clientY } = e;
    const deltaX = clientX - dragStartPosition.current.x;
    const deltaY = clientY - dragStartPosition.current.y;

    let newX = cropStartPosition.current.x + deltaX;
    let newY = cropStartPosition.current.y + deltaY;

    // 바운드 체크
    newX = Math.max(0, Math.min(newX, originalImageSize.width - crop.width));
    newY = Math.max(0, Math.min(newY, originalImageSize.height - crop.height));

    setCrop(prev => ({
      ...prev,
      x: newX,
      y: newY
    }));
  };

  // 크롭 영역 드래그 종료
  const onCropMouseUp = () => {
    setIsDragging(false);
    window.removeEventListener('mousemove', onCropMouseMove);
    window.removeEventListener('mouseup', onCropMouseUp);
  };

  // 크롭 핸들 드래그 시작
  const onResizeStart = (e, handle) => {
    e.preventDefault();
    resizeHandle.current = handle;
    dragStartPosition.current = { x: e.clientX, y: e.clientY };
    cropStartPosition.current = { ...crop };
    
    window.addEventListener('mousemove', onResizeMove);
    window.addEventListener('mouseup', onResizeEnd);
  };

  // 크롭 핸들 드래그 중
  const onResizeMove = (e) => {
    if (!resizeHandle.current) return;

    const deltaX = e.clientX - dragStartPosition.current.x;
    const deltaY = e.clientY - dragStartPosition.current.y;
    
    let newCrop = { ...crop };
    
    // 핸들 위치에 따른 크롭 영역 조정
    switch (resizeHandle.current) {
      case 'nw':
        newCrop.x = Math.min(crop.x + deltaX, crop.x + crop.width);
        newCrop.y = Math.min(crop.y + deltaY, crop.y + crop.height);
        newCrop.width = Math.max(0, crop.width - deltaX);
        newCrop.height = Math.max(0, crop.height - deltaY);
        break;
      case 'ne':
        newCrop.y = Math.min(crop.y + deltaY, crop.y + crop.height);
        newCrop.width = Math.max(0, crop.width + deltaX);
        newCrop.height = Math.max(0, crop.height - deltaY);
        break;
      // ... 다른 핸들들에 대한 케이스 추가 ...
    }

    // 비율 유지
    if (aspect) {
      newCrop.height = newCrop.width / aspect;
    }

    // 바운드 체크
    newCrop = checkCropBounds(newCrop);
    
    setCrop(newCrop);
  };

  // 크롭 핸들 드래그 종료
  const onResizeEnd = () => {
    resizeHandle.current = null;
    window.removeEventListener('mousemove', onResizeMove);
    window.removeEventListener('mouseup', onResizeEnd);
  };

  // 크롭 영역이 이미지 범위를 벗어나지 않도록 체크
  const checkCropBounds = (newCrop) => {
    const { width: imgWidth, height: imgHeight } = originalImageSize;
    
    return {
      x: Math.max(0, Math.min(newCrop.x, imgWidth - newCrop.width)),
      y: Math.max(0, Math.min(newCrop.y, imgHeight - newCrop.height)),
      width: Math.min(newCrop.width, imgWidth - newCrop.x),
      height: Math.min(newCrop.height, imgHeight - newCrop.y)
    };
  };

  return (
    <WriteModal isOpen={isOpen} onClose={onClose} title="사진 글쓰기">
      <TitleInput 
        title={title} 
        setTitle={setTitle} 
        placeholder="사진 제목을 입력하세요" 
      />
      
      <div className="photo-editor-container">
        <div className="photo-editor-main">
          <div className="photo-upload-section">
            {!imageFile ? (
              <ImageUploader onImageUpload={setImageFile} />
            ) : (
              <div 
                className="image-preview-container"
                data-ratio={selectedRatio}
                data-orientation={imageOrientation}
                ref={imageContainerRef}
                onMouseDown={handleMouseDown}
                onWheel={handleWheel}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              >
                <div 
                  className="image-crop-overlay"
                  ref={cropOverlayRef}
                >
                  <img 
                    ref={imageRef}
                    src={imagePreview} 
                    alt="미리보기" 
                    className="image-preview"
                    onLoad={onImageLoad}
                    style={{
                      transform: `translate(${cropPosition.x}px, ${cropPosition.y}px) scale(${zoomLevel})`,
                      cursor: isDragging ? 'grabbing' : 'grab'
                    }}
                  />
                </div>
                <div className="crop-instructions">
                  <p>마우스로 드래그하여 위치를 조정하세요</p>
                  <p>마우스 휠로 확대/축소할 수 있습니다</p>
                </div>
                <button 
                  className="change-image-button"
                  onClick={() => setImageFile(null)}
                >
                  이미지 변경
                </button>
              </div>
            )}
          </div>
          
          {imagePreview && (
            <div className="photo-edit-controls">
              <div className="control-section">
                <h3>이미지 비율</h3>
                <ImageRatioSelector 
                  selectedRatio={selectedRatio}
                  setSelectedRatio={setSelectedRatio}
                  options={ratioOptions}
                />
              </div>
              
              <div className="control-section">
                <h3>EXIF 데이터</h3>
                <ExifEditor 
                  exifData={exifData}
                  editedExif={editedExif}
                  setEditedExif={setEditedExif}
                />
              </div>
              
              <div className="control-section">
                <h3>프리셋</h3>
                <PresetManager 
                  presets={presets}
                  selectedPreset={selectedPreset}
                  onSavePreset={savePreset}
                  onLoadPreset={loadPreset}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="write-modal-footer">
        <button 
          onClick={handleSubmit} 
          className="submit-button"
          disabled={!imageFile}
        >
          저장
        </button>
        <button onClick={onClose} className="cancel-button">취소</button>
      </div>
    </WriteModal>
  );
};

export default PhotoWriteModal;
