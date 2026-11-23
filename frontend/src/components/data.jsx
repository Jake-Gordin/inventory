import { ItemDetailsButton, AddItemButton } from "./Buttons"
function ItemListEntry(item, key) {
    //console.log("item as seen by entry: ")
    //console.log(item)
    return (
        <tr key={key}>
            <th style={styles.inventoryTableData}>{item.item.name}</th>
            <td style={styles.inventoryTableData}>{item.item.shortDescription}</td>
            <td style={styles.inventoryTableData}>{item.item.quantity}</td>
            <td style={styles.inventoryTableData}><ItemDetailsButton item={item.item}/></td>
        </tr>
    )
}
export function InventoryTable({items, currentUser}) {
    //console.log("items as seen by table: ")
    //console.log(items)
    if (items.length > 0 && currentUser == 'Guest') {
        return (
            <table style={styles.inventoryTable}>
                <thead>
                <tr style={styles.inventoryTableRow}>
                    <th style={styles.inventoryTableHeader}>Name</th>
                    <th style={styles.inventoryTableHeader}>Description</th>
                    <th style={styles.inventoryTableHeader}>Quantity</th>
                    <th style={styles.inventoryTableHeader}>Details</th>
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
            <table style={styles.inventoryTable}>
                <thead>
                <tr style={styles.inventoryTableRow}>
                    <th style={styles.inventoryTableHeader}>Name</th>
                    <th style={styles.inventoryTableHeader}>Description</th>
                    <th style={styles.inventoryTableHeader}>Quantity</th>
                    <th style={styles.inventoryTableHeader}>Details</th>
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
//styles
const styles = {
  inventoryTable: {
   
  },
  inventoryTableRow: {
   
  },
  inventoryTableHeader: {
    padding: "4vw"
  },
  inventoryTableData: {
   textAlign: "center",
   maxWidth: "20vw"
  }
}