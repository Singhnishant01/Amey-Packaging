function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  if (totalPages <= 1) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        marginTop: "25px",
        flexWrap: "wrap",
      }}
    >
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        style={buttonStyle}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          style={{
            ...buttonStyle,
            background:
              currentPage === index + 1
                ? "#9a5318"
                : "#fff",
            color:
              currentPage === index + 1
                ? "#fff"
                : "#000",
            border: "1px solid #ccc",
          }}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        style={buttonStyle}
      >
        Next
      </button>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  background: "#9a5318",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "600",
};

export default Pagination;