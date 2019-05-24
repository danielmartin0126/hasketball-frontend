import React from 'react';


const PlayerCard = (props) => {


return(
	<div className="card">
    <div className="content">
      <div className="header">
        {props.player.f_name +" "+ props.player.l_name}
      </div>
      <div className="meta">
        Postion: {props.player.position}
      </div>
      <div className="description">
        Stuff goes here
      </div>
    </div>
    <div className="extra content">
      <div className="ui two buttons">
        <div className="ui basic green button">Draft</div>
        <div className="ui basic blue button">View Stats</div>
      </div>
    </div>
  </div>
)

}










export default PlayerCard;