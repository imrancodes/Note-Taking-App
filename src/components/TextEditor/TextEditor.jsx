import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import "highlight.js/styles/github-dark.css";

const lowlight = createLowlight();

const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit, // Basic formatting (Bold, Italic, Lists, etc.)
      Underline, // Underline text
      Link, // Add hyperlinks
      Image, // Add images
      CodeBlockLowlight.configure({ lowlight }), // Code block with syntax highlighting
    ],
    content: `<p>Hello, start writing here...</p>`,
  });

  if (!editor) return null; // Prevent errors if the editor is not ready

  return (
    <div className="p-4 dark:bg-[#303034] bg-[#E5E7EB] rounded-xl shadow my-6">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-200 dark:bg-gray-700 rounded">
        {/* Bold */}
        <button 
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive("bold") ? "bg-gray-400" : ""}`}
        >
          B
        </button>

        {/* Italic */}
        <button 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive("italic") ? "bg-gray-400" : ""}`}
        >
          I
        </button>

        {/* Underline */}
        <button 
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${editor.isActive("underline") ? "bg-gray-400" : ""}`}
        >
          U
        </button>

        {/* Strikethrough */}
        <button 
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded ${editor.isActive("strike") ? "bg-gray-400" : ""}`}
        >
          S̶
        </button>

        {/* Headings (H1, H2, H3) */}
        <button 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded ${editor.isActive("heading", { level: 1 }) ? "bg-gray-400" : ""}`}
        >
          H1
        </button>

        <button 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${editor.isActive("heading", { level: 2 }) ? "bg-gray-400" : ""}`}
        >
          H2
        </button>

        <button 
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded ${editor.isActive("heading", { level: 3 }) ? "bg-gray-400" : ""}`}
        >
          H3
        </button>

        {/* Bullet List */}
        <button 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor.isActive("bulletList") ? "bg-gray-400" : ""}`}
        >
          • List
        </button>

        {/* Numbered List */}
        <button 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${editor.isActive("orderedList") ? "bg-gray-400" : ""}`}
        >
          1. List
        </button>

        {/* Blockquote */}
        <button 
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${editor.isActive("blockquote") ? "bg-gray-400" : ""}`}
        >
          "
        </button>

        {/* Code Block */}
        <button 
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded ${editor.isActive("codeBlock") ? "bg-gray-400" : ""}`}
        >
         {/* Code Icon */}
        </button>

        {/* Inline Code */}
        <button 
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded ${editor.isActive("code") ? "bg-gray-400" : ""}`}
        >
          `code`
        </button>

        {/* Add Link */}
        <button 
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className="p-2 rounded"
        >
          🔗
        </button>

        {/* Remove Link */}
        <button 
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="p-2 rounded"
        >
          ❌🔗
        </button>

        {/* Add Image */}
        <button 
          onClick={() => {
            const url = prompt("Enter image URL:");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className="p-2 rounded"
        >
          🖼️
        </button>

      </div>

      {/* Text Editor */}
      <EditorContent editor={editor} className="prose max-w-none dark:text-white" />
    
    </div>
  );
};

export default TextEditor;
