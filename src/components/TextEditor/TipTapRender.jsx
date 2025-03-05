import { useEffect, useState } from 'react';
import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { createLowlight, all } from 'lowlight';
import 'highlight.js/styles/github-dark.css';
import '../../index.css';
import Heading from '@tiptap/extension-heading';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';
import CodeBlockComponent from './CodeBlockComponent';
import Placeholder from '@tiptap/extension-placeholder';
import TextEditor from './TextEditor';

const lowlight = createLowlight(all);

lowlight.register('html', html);
lowlight.register('css', css);

const TipTapRender = ({ initialContent = '', editable = true, onContentChange }) => {

    const [editorContent, setEditorContent] = useState(initialContent)


    const editor = useEditor({
        extensions: [
            Heading.configure({ levels: [1, 2, 3] }),
            StarterKit.configure({
                heading: false,
                codeBlock: false,
            }),
            Underline,
            Link,
            Image,
            Placeholder.configure({
                placeholder: 'Write your notes here...',
            }),
            CodeBlockLowlight.extend({
                addNodeView() {
                    return ReactNodeViewRenderer(CodeBlockComponent);
                },
            }).configure({ lowlight }),
        ],
        content: initialContent,
        onUpdate: ({ editor }) => {
            const content = editor.getJSON()
            setEditorContent(content)
            onContentChange(content)
        }

    });

    useEffect(() => {
        if (editor) {
            editor.setEditable(editable); 
        }
    }, [editor, editable]);

    return (
        <>
        {editable && <TextEditor editor={editor} />}
        <div className="p-4 max-[500px]:px-2 dark:bg-[#303034] bg-[#E5E7EB] rounded-lg shadow mb-4 mt-3">
            <EditorContent
                editor={editor}
                className="prose max-w-none dark:text-white"
            />
        </div>
        </>
    )
};

export default TipTapRender;