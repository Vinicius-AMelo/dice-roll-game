export default function Dice (props){
const styles = {
    backgroundColor: props.held ? "#59E391" : 'white'
}
    return (
        <div 
       style={styles} className="dice"
        onClick={props.hold}>
           <h2>{props.value}</h2>
        </div>
    )
}