import './Item.css';

interface ItemProps
{
    name: string,
    desc: string,
    tags: string[],
    state: boolean,
}

function Item(props: ItemProps)
{
    const expand = true;

    return (
        <div className="Item">
            <div className="Item-bar">
                <h3 className="Item-name">{ props.name }</h3>
                <div className={"Item-state" + ( props.state ? " Item-complete" : " Item-incomplete")}></div>
            </div>
            <div className={"Item-expand" + ( expand ? "" : " Item-hidden" )}>
                <p className="Item-desc">{ props.desc }</p>
                <div className="Item-tags">
                    {
                        props.tags.map((tag, i) => {
                            return (
                                <div className="Item-tag" key={i}>
                                    { tag }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Item;
