export default function Document() {
  return (
    <div>
      {process.env.NODE_ENV === 'development' ? (
        <span>test111111</span>
      ) : (
        <span>test2222222</span>
      )}
    </div>
  );
}
