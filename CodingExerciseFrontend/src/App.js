function App(props) {
  // if (!localStorage.getItem('HelloBuildApp')) {
  //   return (<Redirect to="/login" />)
  // }
  return (
    <div>{props.children}</div>
  )
}

export default App;
