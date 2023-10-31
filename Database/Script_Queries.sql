use Prueba;

--1 El total de ventas de los últimos 30 días (monto total y cantidad total de ventas).

select 
	count(ID_Venta) 'Total de ventas',
	sum(Total) 'Monto total' 
from 
	Venta
where 
	Fecha >= DATEADD(day, -30, GETDATE());

--2 El día y hora en que se realizó la venta con el monto más alto (y cuál es aquel monto).

select top 1
	Fecha,
	Total
from 
	Venta
where 
	Fecha >= DATEADD(day, -30, GETDATE())
order by 
	Total desc;

--3 Indicar cuál es el producto con mayor monto total de ventas. El total de ventas de un producto se encuentra en la tabla VentaDetalle columna TotalLinea.

select top 1 
	P.ID_Producto, 
	P.Nombre, 
	sum(VD.TotalLinea) 'Monto Total'
from 
	VentaDetalle VD
	join Producto P on VD.ID_Producto = P.ID_Producto
group by 
	P.ID_Producto, 
	P.Nombre
order by 
	sum(VD.TotalLinea) desc;

--4 Indicar el local con mayor monto de ventas.

select top 1
	L.ID_Local,
	L.Nombre,
	sum(V.Total) 'Total'
from Venta V
	join Local L on L.ID_Local = V.ID_Local
where 
	Fecha >= DATEADD(day, -30, GETDATE())
group by 
	L.ID_Local, L.Nombre
order by 
	sum(V.Total) desc;


--5 ¿Cuál es la marca con mayor margen de ganancias? El margen de ganancias de un producto
--está dado por (Cantidad vendida * Precio unitario) - (Cantidad vendida * Costo).

select top 1
    M.ID_Marca,
    M.Nombre as NombreMarca,
    sum((VD.Cantidad * VD.Precio_Unitario) - (VD.Cantidad * P.Costo_Unitario)) as MargenGanancias
from
    Venta V
    join VentaDetalle VD on V.ID_Venta = VD.ID_Venta
    join Producto P on VD.ID_Producto = P.ID_Producto
    join Marca M on P.ID_Marca = M.ID_Marca
group by
    M.ID_Marca,
    M.Nombre
order by 
	sum((VD.Cantidad * VD.Precio_Unitario) - (VD.Cantidad * P.Costo_Unitario)) desc

--6 ¿Cómo obtendrías cuál es el producto que más se vende en cada local?

with VentasPorProductoMarca as (
    select 
		M.Nombre as Marca,
        P.Nombre as Producto,
        sum(VD.Cantidad) as TotalVendido
    from Venta V
        join VentaDetalle VD on V.ID_Venta = VD.ID_Venta
        join Producto P on VD.ID_Producto = P.ID_Producto
        join Marca M on P.ID_Marca = M.ID_Marca
    group by M.Nombre, P.Nombre
),

MaximoVentaPorMarca as (
	select
        Marca,
        max(TotalVendido) as MaxTotalVendido
    from
        VentasPorProductoMarca
    group by 
        Marca
)

select
    VPM.Marca,
    VPM.Producto,
    VPM.TotalVendido
from
    VentasPorProductoMarca VPM
	join MaximoVentaPorMarca MVPM on VPM.Marca = MVPM.Marca AND VPM.TotalVendido = MVPM.MaxTotalVendido
order by VPM.TotalVendido desc;
	