//24Feb
// 2180607677 Nguyễn Hoàng Kỳ

class Product {
    constructor(id, name, price, cost, tax, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.cost = cost;
        this.tax = tax;
        this.quantity = quantity;
    }
}

const products = [
    new Product(1, "Laptop", 1500, 1000, 0.2, 5),
    new Product(2, "Smartphone", 200, 300, 0.08, 10),
    new Product(3, "Headphones", 200, 120, 0.05, 0),
    new Product(4, "Keyboard", 800, 50, 0.07, 20)

];

// Sử dụng map để in ra mảng tổng doanh thu của mỗi sản phẩm price*(1+tax)*quantity
const tongDoanhThu = products.map(product => product.price * (1 + product.tax) * product.quantity);
console.log(tongDoanhThu);

// Sử dụng reduce để tính tổng lợi nhuận trước thuế của tất cả SP: (price*(1+tax)-cost)*quantity
const tongLoiNhuan = products.reduce((sum, product) => sum + ((product.price * (1 + product.tax) - product.cost) * product.quantity), 0);
console.log(tongLoiNhuan);

// Sử dụng filter để trả ra tất cả các sản phẩm bán lỗ (price<cost)
const spBanLo = products.filter(product => product.price < product.cost);
console.log(spBanLo);

// Sử dụng every để kiểm tra xem có sản phẩm nào hết hàng hay không?
const checkKho = products.every(product => product.quantity > 0);
console.log(checkKho ? "-> Tất cả sản phẩm đều còn hàng" : "-> Có sản phẩm đã hết hàng");

// Sử dụng some để kiểm tra xem có sản phẩm nào bán lãi nhiều hay không (price>=1.5 cost)
const ktsp = products.some(product => product.price >= 1.5 * product.cost);
console.log(ktsp ? "-> Có sản phẩm bán lãi nhiều" : "-> Không có sản phẩm nào bán lãi nhiều");

// sắp xếp danh sách theo price từ thấp đến cao nếu giá bằng nhau thì sắp xếp theo tên, nếu tên giống nhau thì sắp xếp theo id
products.sort((a, b) => {
    if (a.price !== b.price) return a.price - b.price;
    if (a.name !== b.name) return a.name.localeCompare(b.name);
    return a.id - b.id;
});