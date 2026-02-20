import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { updateUserInfo, uploadAvatar } from '@/services';
import type { UserInfo, updateUserInfoParams } from '../../types/UserInfo';
import './UserInfoPage.css';

// 默认头像
import defaultAvatar from '../../assets/avator/defaultAvator.jpg';

const genderMap: Record<number, string> = { 0: '未知', 1: '男', 2: '女' };
const userTypeMap: Record<number, string> = { 0: '普通用户', 1: '管理员' };

function UserInfoPage() {
  const { user, setUser } = useAuthStore();
  const token = useAuthStore((s) => s.token);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<updateUserInfoParams>({
    id: 0,
    nickname: '',
    phone: '',
    email: '',
    gender: 0,
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 同步 store 数据到表单
  useEffect(() => {
    if (user) {
      setForm({
        id: user.id,
        nickname: user.nickname ?? '',
        phone: user.phone ?? '',
        email: user.email ?? '',
        gender: user.gender ?? 0,
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="userinfo-page">
        <div className="userinfo-empty">暂无用户信息，请先登录</div>
      </div>
    );
  }

  const handleChange = (field: keyof updateUserInfoParams, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg(null);
    try {
      const res = await updateUserInfo(form);
      if (res.success) {
        // 更新 store 中的用户信息
        const updated: UserInfo = {
          ...user,
          nickname: form.nickname ?? user.nickname,
          phone: form.phone ?? user.phone,
          email: form.email ?? user.email,
          gender: form.gender ?? user.gender,
        };
        setUser(updated, token);
        setMsg({ type: 'success', text: '保存成功！' });
        setEditing(false);
      } else {
        setMsg({ type: 'error', text: res.errorMsg ?? '保存失败' });
      }
    } catch {
      setMsg({ type: 'error', text: '网络错误，请稍后重试' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // 还原表单
    setForm({
      id: user.id,
      nickname: user.nickname ?? '',
      phone: user.phone ?? '',
      email: user.email ?? '',
      gender: user.gender ?? 0,
    });
    setEditing(false);
    setMsg(null);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 校验文件类型和大小
    if (!file.type.startsWith('image/')) {
      setMsg({ type: 'error', text: '请选择图片文件' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMsg({ type: 'error', text: '图片大小不能超过 5MB' });
      return;
    }

    // 本地预览
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);

    // 上传
    setUploading(true);
    setMsg(null);
    try {
      const res = await uploadAvatar(file , 'avatar');
      if (res.success == true) {
        // setUser(res.data, token);
        setMsg({ type: 'success', text: '头像上传成功！' });
        setAvatarPreview(res.data || reader.result as string);
      } else {
        setMsg({ type: 'error', text: res.errorMsg ?? '上传失败' });
        setAvatarPreview(null);
      }
    } catch {
      setMsg({ type: 'error', text: '上传失败，请稍后重试' });
      setAvatarPreview(null);
    } finally {
      setUploading(false);
      // 重置 input 以便重复选择同一文件
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const avatarSrc = avatarPreview || user.avatar || defaultAvatar;

  return (
    <div className="userinfo-page">
      {/* 左侧卡片：头像 + 昵称 + 身份 */}
      <div className="userinfo-left">
          <div className="userinfo-left-bg">
            <div className="userinfo-left-bg-circle userinfo-left-bg-circle-1"></div>
            <div className="userinfo-left-bg-circle userinfo-left-bg-circle-2"></div>
            <div className="userinfo-left-bg-circle userinfo-left-bg-circle-3"></div>
          </div>
          <div className="userinfo-avatar-wrapper" onClick={handleAvatarClick}>
            <img src={avatarSrc} alt="用户头像" className="userinfo-avatar" />
            <div className="userinfo-avatar-overlay">
              {uploading ? (
                <span className="userinfo-avatar-overlay-text">上传中...</span>
              ) : (
                <>
                  <span className="userinfo-avatar-overlay-icon">📷</span>
                  <span className="userinfo-avatar-overlay-text">更换头像</span>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="userinfo-avatar-input"
              onChange={handleAvatarUpload}
            />
          </div>
          <h2 className="userinfo-nickname">{user.nickname}</h2>
          <span className="userinfo-type-badge">
            {userTypeMap[user.userType] ?? '未知'}
          </span>
          <div className="userinfo-left-extra">
            <span className="userinfo-gender-tag">{genderMap[user.gender] ?? '未知'}</span>
          </div>
      </div>

      {/* 右侧内容区 */}
      <div className="userinfo-right">
          <div className="userinfo-right-header">
            <h3 className="userinfo-right-title">个人信息</h3>
            {!editing && (
              <button
                className="userinfo-btn userinfo-btn-edit"
                onClick={() => setEditing(true)}
              >
                ✏️ 编辑
              </button>
            )}
          </div>

          {/* 提示消息 */}
          {msg && (
            <div className={`userinfo-msg userinfo-msg-${msg.type}`}>
              {msg.text}
            </div>
          )}

          {/* 信息列表 */}
          <div className="userinfo-fields">
            {/* 昵称 */}
            <div className="userinfo-field">
              <div className="userinfo-field-label">😊 昵称</div>
              <div className="userinfo-field-value">
                {editing ? (
                  <input
                    className="userinfo-input"
                    value={form.nickname}
                    onChange={(e) => handleChange('nickname', e.target.value)}
                    placeholder="请输入昵称"
                    maxLength={20}
                  />
                ) : (
                  <span>{user.nickname}</span>
                )}
              </div>
            </div>

            {/* 电话 */}
            <div className="userinfo-field">
              <div className="userinfo-field-label">📞 电话</div>
              <div className="userinfo-field-value">
                {editing ? (
                  <input
                    className="userinfo-input"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="请输入电话号码"
                    maxLength={11}
                  />
                ) : (
                  <span>{user.phone || '未填写'}</span>
                )}
              </div>
            </div>

            {/* 邮箱 */}
            <div className="userinfo-field">
              <div className="userinfo-field-label">📧 邮箱</div>
              <div className="userinfo-field-value">
                {editing ? (
                  <input
                    className="userinfo-input"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="请输入邮箱"
                  />
                ) : (
                  <span>{user.email || '未填写'}</span>
                )}
              </div>
            </div>

            {/* 性别 */}
            <div className="userinfo-field">
              <div className="userinfo-field-label">👤 性别</div>
              <div className="userinfo-field-value">
                {editing ? (
                  <select
                    className="userinfo-select"
                    value={form.gender}
                    onChange={(e) => handleChange('gender', Number(e.target.value))}
                  >
                    <option value={0}>未知</option>
                    <option value={1}>男</option>
                    <option value={2}>女</option>
                  </select>
                ) : (
                  <span>{genderMap[user.gender] ?? '未知'}</span>
                )}
              </div>
            </div>

            {/* 用户类型（只读） */}
            <div className="userinfo-field">
              <div className="userinfo-field-label">🏷️ 用户类型</div>
              <div className="userinfo-field-value">
                <span>{userTypeMap[user.userType] ?? '未知'}</span>
              </div>
            </div>

            {/* 创建时间（只读） */}
            <div className="userinfo-field">
              <div className="userinfo-field-label">🕐 创建时间</div>
              <div className="userinfo-field-value">
                <span>{user.createTime}</span>
              </div>
            </div>
          </div>

          {/* 编辑模式下的操作按钮 */}
          {editing && (
            <div className="userinfo-actions">
              <button
                className="userinfo-btn userinfo-btn-save"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? '保存中...' : '💾 保存'}
              </button>
              <button
                className="userinfo-btn userinfo-btn-cancel"
                onClick={handleCancel}
                disabled={saving}
              >
                取消
              </button>
            </div>
          )}
      </div>
    </div>
  );
}

export default UserInfoPage;
