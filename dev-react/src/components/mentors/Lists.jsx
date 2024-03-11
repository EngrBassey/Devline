import React from 'react';
import './listbox.css';

const activity = 
[   "React class @ 2:30pm", "Python Class @3:30am",
    "Python Class @3:30am", "Python Class @3:30am",
    "Python Class @3:30am", "Python Class @3:30am",
    "Python Class @3:30am", "Python Class @3:30am", "Python Class @3:30am",
    "Python Class @3:30am"            
]

const Lists = () => {
  return (
    <div className='list-box'>
        {activity.map((i) => (
            <p>{i}</p>
        ))}
    </div>
  )
}

export default Lists
