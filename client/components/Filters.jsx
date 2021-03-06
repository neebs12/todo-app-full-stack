import React, {useState, useEffect} from 'react'

export default function Filters(props) {
  const [themeInput, setThemeInput] = useState('')
  const [importanceInput, setImportanceInput] = useState('')

  useEffect(() => {
    // ohh shit it works lmao tf
    setThemeInput(props.themes[0] && props.themes[0].description)
    setImportanceInput(props.importance[0] && props.importance[0].description)
  }, [props.themes, props.importance]) // so stuff works!!! ugh

  return (
    <div className="filter-box">
      <label htmlFor="theme">Filter by Theme:</label>
      <select 
        name="theme" id="theme" 
        value={themeInput} 
        onChange={e => setThemeInput(e.target.value)}
      >
        {props.themes.map(t => {
          // t.id and t.description
          const [key, descr] = [t.id, t.description]
          return <option key={key} value={descr}>{descr}</option>
        })}        
      </select>      
      <label htmlFor="importance_level">Filter by Importance:</label>
      <select 
        name="importance_level" id="importance_level" 
        value={importanceInput} 
        onChange={e => setImportanceInput(e.target.value)}
      >
        {props.importance.map(imp => {
          // imp.id and imp.description
          const [key, descr] = [imp.id, imp.description]
          return <option key={key} value={descr}>{descr}</option>
        })}
      </select>      
    </div>
  )

}