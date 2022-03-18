import {
  ComponentProps,
  Streamlit,
  withStreamlitConnection,
} from "streamlit-component-lib"
import { 
  useEffect,
  useState 
} from "react"

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */


const StreamlitDimensions = (props: ComponentProps) => {
  const [prevWidth, setprevWidth] = useState(0);
  console.log(props.width, prevWidth)

  useEffect(() => {

    if (props.width !== prevWidth) {
      let timeout: ReturnType<typeof setTimeout>;
      
      timeout = setTimeout(() => {
        Streamlit.setComponentValue({width: props.width})
        setprevWidth(props.width);
      }, 100);

      return () => { clearTimeout(timeout) };
    }
  })

  return null;
}

export default withStreamlitConnection(StreamlitDimensions);
