CREATE TABLE public.usuarios (
	nombre varchar NOT NULL,
	id varchar NOT NULL,
	apellidos varchar NOT NULL,
	rol int4 NOT NULL,
	clave varchar NOT NULL
);

CREATE TABLE public.destinos (
	id serial NOT NULL,
	nombre varchar NOT NULL,
	descripcion text NOT NULL,
	precio money NOT NULL,
	CONSTRAINT destinos_pk PRIMARY KEY (id)
);

CREATE TABLE public.archivos (
	id serial NOT NULL,
	nombre varchar NOT NULL,
	url varchar NOT NULL,
	id_padre varchar NULL,
	tipo_padre varchar NULL,
	CONSTRAINT archivos_pk PRIMARY KEY (id)
);

