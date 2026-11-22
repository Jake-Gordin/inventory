import { ItemDetailsButton, AddItemButton } from "./buttons"
function ItemListEntry(item, key) {
    //console.log("item as seen by entry: ")
    //console.log(item)
    return (
        <tr key={key}>
            <th>{item.item.name}</th>
            <td>{item.item.shortDescription}</td>
            <td>{item.item.quantity}</td>
            <td><ItemDetailsButton item={item.item}/></td>
        </tr>
    )
}
export function InventoryTable({items, currentUser}) {
    //console.log("items as seen by table: ")
    //console.log(items)
    if (items.length > 0 && currentUser == 'Guest') {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <ItemListEntry item={item} key={item.id}/>
                ))}
                </tbody>
            </table>
        )
        
    }
    else if (items.length > 0 && currentUser !== 'Guest') {
        return (
            <>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <ItemListEntry item={item} key={item.id}/>
                ))}
                </tbody>
            </table>
            <AddItemButton/>
            </>
        )

    }
    else {
        if (currentUser == 'Guest') {
            return (
                <h3>No items current in inventory. Create an account to add some!</h3>
            )
        }
        else {
            return (
                <>
                <h3>No items for current user. Click below to add some!</h3>
                <AddItemButton/>
                </>
            )
        }
    }
}