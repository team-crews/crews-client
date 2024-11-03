import React from 'react';

const CrewsFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed bottom-0 right-0 flex justify-end gap-4 rounded-tl-md border-l border-t bg-crews-w01 p-4 shadow-custom-light-shadow">
      {children}
    </div>
  );
};

export default CrewsFooter;
