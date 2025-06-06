import React from "react";

const renderLexicalNode = (node, index) => {
  if (node.type === "paragraph" && node.children) {
    return (
      <p key={index} className="mb-2 text-gray-700">
        {node.children.map((child, i) => renderLexicalNode(child, i))}
      </p>
    );
  }
  if (node.type === "text" && node.text) {
    let content = node.text;
    if (node.format & 1) content = <strong>{content}</strong>; // Bold
    if (node.format & 2) content = <em>{content}</em>; // Italic
    // Add more formats as needed (underline, strikethrough, etc.)
    return <React.Fragment key={index}>{content}</React.Fragment>;
  }
  if (node.type === "list" && node.children) {
    const ListTag = node.listType === "bullet" ? "ul" : "ol";
    return (
      <ListTag key={index} className={`mb-2 ml-6 ${node.listType === "bullet" ? "list-disc" : "list-decimal"}`}>
        {node.children.map((child, i) => renderLexicalNode(child, i))}
      </ListTag>
    );
  }
  if (node.type === "listitem" && node.children) {
    return (
      <li key={index} className="text-gray-700">
        {node.children.map((child, i) => renderLexicalNode(child, i))}
      </li>
    );
  }
  // Fallback for unhandled node types or if children are empty
  return null;
};

const ProductDescription = ({ descriptionData }) => {
  if (!descriptionData || !descriptionData.root || !descriptionData.root.children) {
    return <p className="text-gray-500">No description available.</p>;
  }

  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
      {descriptionData.root.children.map((node, index) => renderLexicalNode(node, index))}
    </div>
  );
};

export default ProductDescription;
