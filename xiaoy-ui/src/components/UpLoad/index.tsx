import "./UpLoad.css";
import defaultAvatar from '@/assets/avator/defaultAvator1.jpg';
import { useState, useRef } from 'react';
import { uploadAvatar } from '@/services';
interface UpLoadProps {
    avatar?: string | null;

    returnSrc?: (src: string) => void;
}
function UpLoad({avatar, returnSrc}: UpLoadProps) {
  //预览图
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    //是否在上传中
    const [uploading, setUploading] = useState(false);
    //文件输入的 ref
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleAvatarClick = () => {
      fileInputRef.current?.click();
    };
    const avatarSrc = avatarPreview || avatar || defaultAvatar;
    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        // 校验文件类型和大小
        if (!file.type.startsWith('image/')) {
          // setMsg({ type: 'error', text: '请选择图片文件' });
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          // setMsg({ type: 'error', text: '图片大小不能超过 5MB' });
          return;
        }
    
        // 本地预览
        const reader = new FileReader();
        reader.onload = () => setAvatarPreview(reader.result as string);
        reader.readAsDataURL(file);
    
        // 上传
        setUploading(true);
        // setMsg(null);
        try {
          const res = await uploadAvatar(file , 'avatar');
          if (res.success == true) {
            // setUser(res.data, token);
            // setMsg({ type: 'success', text: '头像上传成功！' });
            setAvatarPreview(res.data || reader.result as string);
            if(returnSrc && res.data) returnSrc(res.data);
          } else {
            // setMsg({ type: 'error', text: res.errorMsg ?? '上传失败' });
            setAvatarPreview(null);
          }
        } catch {
          // setMsg({ type: 'error', text: '上传失败，请稍后重试' });
          setAvatarPreview(null);
        } finally {
          setUploading(false);
          // 重置 input 以便重复选择同一文件
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      };
  return (
    <div className="my-upLoad-wrapper" onClick={handleAvatarClick}>
            <img src={avatarSrc} alt="用户头像" className="my-upLoad" />
            <div className="my-upLoad-overlay">
              {uploading ? (
                <span className="my-upLoad-overlay-text">上传中...</span>
              ) : (
                <>
                  <span className="my-upLoad-overlay-icon">📷</span>
                  <span className="my-upLoad-overlay-text">更换头像</span>
                </>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="my-upLoad-input"
              onChange={handleAvatarUpload}
            />
          </div>
  );
}

export default UpLoad;

