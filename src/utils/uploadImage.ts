const imageUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  onLoad: any
) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        onLoad(img);
      };
    };

    reader.readAsDataURL(file);
  }
};

export default imageUpload;