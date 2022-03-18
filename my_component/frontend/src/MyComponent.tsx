import {
  // ComponentProps,
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { 
  ReactNode, 
  // useEffect, useState 
} from "react"
// import { ScriptElementKindModifier } from "typescript";

interface State {
  numClicks: number
  isFocused: boolean
  width: number
  height: number
  prevWidth: number
}

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */


// const StreamlitDimensions = (props: ComponentProps) => {
//   const [prevWidth, setprevWidth] = useState(0);
//   // const [skips, setSkips] = useState(0);

//   // // const getAbsDelta = (width: number) => {
//   // //   return Math.abs(width - prevWidth);
//   // // }
//   console.log(props.width, prevWidth) //, skips)

//   useEffect(() => {

//     if (props.width !== prevWidth) {
//       Streamlit.setComponentValue({width: props.width})
//       setprevWidth(props.width);
//       // if (Math.abs(props.width - prevWidth) > 10) {
//       //   Streamlit.setComponentValue({width: props.width})
//       //   setprevWidth(props.width);
//       //   setSkips(0);
//       // } else {
//       //   setSkips(skips + 1);
//       // }
//     }
//     //  else {
//     //     if (skips > 100) {
//     //       Streamlit.setComponentValue({width: props.width})
//     //       setprevWidth(props.width);
//     //       setSkips(0);
//     //   }
//     // }

//     // let timeout: ReturnType<typeof setTimeout>;
//     // const handleResize = () => {
//     //   clearTimeout(timeout);
//     //   timeout = setTimeout(() => {
//     //       Streamlit.setComponentValue({width: props.width})
//     //   }, 1000);
//     // }
//     // // handleResize();
//     // window.addEventListener("resize", handleResize);

//     // return () => {
//     //   window.removeEventListener("resize", handleResize);
//     // }
//   })

//   // useEffect(() => {
//   //   getAbsDelta(props.width) > 10 && Streamlit.setComponentValue({width: props.width}) && setPrevWidth(props.width)
//   // }, [getAbsDelta, props.width])


//   return <h1>Hello world</h1>;
// }

// export default withStreamlitConnection(StreamlitDimensions);

class MyComponent extends StreamlitComponentBase<State> {
  public state = { numClicks: 0, isFocused: false, width: window.innerWidth, height: window.innerHeight, prevWidth: this.props.width };

  //   () => {
  //   let timeout: ReturnType<typeof setTimeout>;;
  //   const handleResize = () => {
  //     clearTimeout(timeout);

  //     setWindowResizing(true);

  //     timeout = setTimeout(() => {
  //       setWindowResizing(false);
  //     }, 200);
  //   }
  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // onChange(event) {
  //   const { target } = event;
  //   const { value } = target;

  //   if (hasNumbers(value)) {
  //     target.value = numbersToText(value);

  //     this.childrenOnChange(event);
  //   }
  // }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  public render = (): ReactNode => {
    // Arguments that are passed to the plugin in Python are accessible
    // via `this.props.args`. Here, we access the "name" arg.
    const name = this.props.args["name"]

    // Streamlit sends us a theme object via props that we can use to ensure
    // that our component has visuals that match the active theme in a
    // streamlit app.
    const { theme } = this.props
    const style: React.CSSProperties = {}

    // Maintain compatibility with older versions of Streamlit that don't send
    // a theme object.
    if (theme) {
      // Use the theme object to style our button border. Alternatively, the
      // theme style is defined in CSS vars.
      const borderStyling = `1px solid ${
        this.state.isFocused ? theme.primaryColor : "gray"
      }`
      style.border = borderStyling
      style.outline = borderStyling
    }

    // Show a button and some text.
    // When the button is clicked, we'll increment our "numClicks" state
    // variable, and send its new value back to Streamlit, where it'll
    // be available to the Python program.
    return (
      <span>
        Hello, {name}! &nbsp;
        <button
          style={style}
          onClick={this.onClicked}
          disabled={this.props.disabled}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
        >
          Click Me!
        </button>
        <span>Window size: {this.state.width} x {this.state.height}</span>
      </span>
    )
  }

  /** Click handler for our "Click Me!" button. */
  private onClicked = (): void => {
    // Increment state.numClicks, and pass the new value back to
    // Streamlit via `Streamlit.setComponentValue`.
    this.setState(
      prevState => ({ numClicks: prevState.numClicks + 1 }),
      () => Streamlit.setComponentValue({clicks: this.state.numClicks, innerHeight: window.innerHeight, width: this.props.width})
    )
  }

  /** Focus handler for our "Click Me!" button. */
  private _onFocus = (): void => {
    this.setState({ isFocused: true })
  }

  /** Blur handler for our "Click Me!" button. */
  private _onBlur = (): void => {
    this.setState({ isFocused: false })
  }

  componentDidMount() {
    // window.addEventListener('resize', this.updateDimensions);

    Streamlit.setComponentValue({width: this.props.width})
  }

  componentDidUpdate() {
    // window.addEventListener('resize', this.updateDimensions);

    if (this.state.width !== this.props.width) {
      Streamlit.setComponentValue({width: this.props.width})
      this.setState({ width: this.props.width })
    }
  }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.updateDimensions);
  // }
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(MyComponent)
