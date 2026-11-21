import { ItemDetailsButton } from "./Buttons"
export function ItemListEntry({item}) {
    return (
        <tr key={item.id}>
            <th>{item.name}</th>
            <td>{item.shortDescription}</td>
            <td>{item.quantity}</td>
            <td><ItemDetailsButton/></td>
        </tr>
    )
}