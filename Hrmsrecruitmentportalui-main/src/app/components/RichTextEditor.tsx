import { useState, useEffect } from 'react';
import { Textarea } from './ui/textarea';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const [ReactQuill, setReactQuill] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dynamically import react-quill to avoid SSR issues
    let mounted = true;
    
    const loadQuill = async () => {
      try {
        const quillModule = await import('react-quill');
        await import('react-quill/dist/quill.snow.css');
        
        if (mounted) {
          setReactQuill(() => quillModule.default);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load rich text editor:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadQuill();

    return () => {
      mounted = false;
    };
  }, []);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link'
  ];

  // Fallback to textarea if editor is loading or failed to load
  if (isLoading || !ReactQuill) {
    return (
      <div className={className}>
        <Textarea
          value={value.replace(/<[^>]*>/g, '')} // Strip HTML tags for fallback
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'Enter notes...'}
          className="min-h-[200px] text-[12px] border-neutral-200 resize-none"
        />
        {isLoading && (
          <p className="text-[10px] text-neutral-500 mt-1">Loading editor...</p>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="bg-white"
        style={{
          height: '200px',
          marginBottom: '60px'
        }}
      />
    </div>
  );
}
