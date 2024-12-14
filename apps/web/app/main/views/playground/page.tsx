'use client';

import { Editor } from '@monaco-editor/react';

import PageWrapper from '~/modules/page';
import { trpc } from '~/lib/trpc';

const language = 'sql';

export default function Page() {
  const { data: mergedColumnsByRole } = trpc.query.execute.useQuery({
    query: 'select * from foundation.q_deal',
  });

  return (
    <PageWrapper title="Query Playground">
      <div className="h-full w-full rounded-lg border py-2">
        <Editor
          language={language}
          onMount={editor => {
            editor.onKeyDown(event => {
              // onKeyDownRef.current?.(event);
            });

            if (language === 'json' || language === 'sql') {
              const formatValue = () => {
                const current = editor.getValue();
                // const formatted = tryFormat(language, current) ?? current;
                // editor.setValue(formatted);
              };

              formatValue();
              editor.onDidBlurEditorWidget(formatValue);
            }
          }}
        />
      </div>
    </PageWrapper>
  );
}
