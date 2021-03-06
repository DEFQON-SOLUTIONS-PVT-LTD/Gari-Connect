PGDMP                          z            postgres    13.6    13.6 ?    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    13442    postgres    DATABASE     l   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE postgres;
                postgres    false            ?           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3314                        3079    16384 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            ?           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2                       1255    16755    get_bookings(refcursor) 	   PROCEDURE     ?  CREATE PROCEDURE public.get_bookings(INOUT _result_one refcursor DEFAULT 'rs_resultone'::refcursor)
    LANGUAGE plpgsql
    AS $$
begin
  Open _result_one for 
select distinct
b."bookingId" as bookingid,
CONCAT  (u.firstname, ' ', u.lastname) AS  username,
CONCAT  (ms.name , ' ', m.name) as carname,
v.plate_number as number,
l."address" as location,
b."createdAt" as dates,
v."price" as price

from bookings b
inner Join users u ON b."userId" = u."userId"  
inner Join vehicles V ON b."vehicleId" = v."vehicleId"
inner Join models m ON v."modelId" = m."modelId"
inner Join makes ms ON  m."makeId" = ms."makeId"
inner Join locations l ON v."locationId" = l."locationId";
END;
$$;
 A   DROP PROCEDURE public.get_bookings(INOUT _result_one refcursor);
       public          postgres    false            ?            1259    16394    State    TABLE     b   CREATE TABLE public."State" (
    "stateId" integer NOT NULL,
    "Name" character varying(50)
);
    DROP TABLE public."State";
       public         heap    postgres    false            ?            1259    16397    State_stateId_seq    SEQUENCE     ?   ALTER TABLE public."State" ALTER COLUMN "stateId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."State_stateId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    201            ?            1259    16399    authuser    TABLE     ?   CREATE TABLE public.authuser (
    "authuserId" integer NOT NULL,
    phone_no character varying(20),
    otp_code character varying(10),
    otp_expiry timestamp with time zone
);
    DROP TABLE public.authuser;
       public         heap    postgres    false            ?            1259    16402    authuser_authuserId_seq    SEQUENCE     ?   ALTER TABLE public.authuser ALTER COLUMN "authuserId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."authuser_authuserId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    203            ?            1259    16404    availability    TABLE     {   CREATE TABLE public.availability (
    "availabilityId" integer NOT NULL,
    "dayId" smallint,
    "vehicleId" integer
);
     DROP TABLE public.availability;
       public         heap    postgres    false            ?            1259    16407    availability_availabilityId_seq    SEQUENCE     ?   ALTER TABLE public.availability ALTER COLUMN "availabilityId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."availability_availabilityId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    205            ?            1259    16409    bookings    TABLE       CREATE TABLE public.bookings (
    "bookingId" integer NOT NULL,
    "userId" integer,
    "vehicleId" integer,
    is_active boolean,
    uuid character varying(50),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "statusId" integer
);
    DROP TABLE public.bookings;
       public         heap    postgres    false            ?            1259    16412    bookings_bookingId_seq    SEQUENCE     ?   ALTER TABLE public.bookings ALTER COLUMN "bookingId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."bookings_bookingId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    207            ?            1259    16414 
   categories    TABLE     !  CREATE TABLE public.categories (
    "categoryId" integer NOT NULL,
    name character varying(50),
    created_by integer,
    updated_by integer,
    is_active boolean,
    uuid character varying(50),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.categories;
       public         heap    postgres    false            ?            1259    16417    category_categoryId_seq    SEQUENCE     ?   ALTER TABLE public.categories ALTER COLUMN "categoryId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."category_categoryId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    209            ?            1259    16419    city    TABLE     v   CREATE TABLE public.city (
    "cityId" smallint NOT NULL,
    "Name" character varying(50),
    "stateId" integer
);
    DROP TABLE public.city;
       public         heap    postgres    false            ?            1259    16422    city_cityId_seq    SEQUENCE     ?   ALTER TABLE public.city ALTER COLUMN "cityId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."city_cityId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    211            ?            1259    16424    days    TABLE     [   CREATE TABLE public.days (
    "dayId" integer NOT NULL,
    name character varying(20)
);
    DROP TABLE public.days;
       public         heap    postgres    false            ?            1259    16427    days_dayId_seq    SEQUENCE     ?   ALTER TABLE public.days ALTER COLUMN "dayId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."days_dayId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    213            ?            1259    16429 	   favourite    TABLE     u   CREATE TABLE public.favourite (
    "favouriteId" integer NOT NULL,
    "vehicleId" integer,
    "userId" integer
);
    DROP TABLE public.favourite;
       public         heap    postgres    false            ?            1259    16432    favourite_favouriteId_seq    SEQUENCE     ?   ALTER TABLE public.favourite ALTER COLUMN "favouriteId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."favourite_favouriteId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            ?            1259    16434    features    TABLE     >  CREATE TABLE public.features (
    "featureId" integer NOT NULL,
    name character varying(50),
    icon character varying(50),
    created_by integer,
    updated_by integer,
    is_active boolean,
    uuid character varying(50),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.features;
       public         heap    postgres    false            ?            1259    16437    feature_featureId_seq    SEQUENCE     ?   ALTER TABLE public.features ALTER COLUMN "featureId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."feature_featureId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            ?            1259    16439    green_vehicles    TABLE     )  CREATE TABLE public.green_vehicles (
    green_vehicle_id integer NOT NULL,
    name character varying(50),
    created_by integer,
    updated_by integer,
    is_active boolean,
    uuid character varying(50),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
 "   DROP TABLE public.green_vehicles;
       public         heap    postgres    false            ?            1259    16442 "   green_vehicle_green_vehicle_id_seq    SEQUENCE     ?   ALTER TABLE public.green_vehicles ALTER COLUMN green_vehicle_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.green_vehicle_green_vehicle_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            ?            1259    16444 
   guidelines    TABLE     4  CREATE TABLE public.guidelines (
    "guidelineId" integer NOT NULL,
    name character varying(50),
    created_by integer,
    updated_by integer,
    is_active boolean,
    uuid character varying(50),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.guidelines;
       public         heap    postgres    false            ?            1259    16447    guideline_guidelineId_seq    SEQUENCE     ?   ALTER TABLE public.guidelines ALTER COLUMN "guidelineId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."guideline_guidelineId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221            ?            1259    16449 	   locations    TABLE     f  CREATE TABLE public.locations (
    "locationId" integer NOT NULL,
    address text,
    floor character varying(30),
    zip_code character varying(10),
    uuid character varying(50),
    "cityId" smallint,
    latitude double precision,
    longitude double precision,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.locations;
       public         heap    postgres    false            ?            1259    16455    location_locationId_seq    SEQUENCE     ?   ALTER TABLE public.locations ALTER COLUMN "locationId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."location_locationId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    223            ?            1259    16457    makes    TABLE     *  CREATE TABLE public.makes (
    "makeId" integer NOT NULL,
    name character varying(50),
    created_by integer,
    updated_by integer,
    is_active boolean,
    uuid character varying(50),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.makes;
       public         heap    postgres    false            ?            1259    16460    make_makeId_seq    SEQUENCE     ?   ALTER TABLE public.makes ALTER COLUMN "makeId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."make_makeId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    225            ?            1259    16462    models    TABLE     9  CREATE TABLE public.models (
    "modelId" integer NOT NULL,
    name character varying(32),
    created_by integer,
    updated_by integer,
    is_active boolean,
    "makeId" integer,
    uuid character varying(50),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.models;
       public         heap    postgres    false            ?            1259    16465    model_modelId_seq    SEQUENCE     ?   ALTER TABLE public.models ALTER COLUMN "modelId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."model_modelId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    227            ?            1259    16467    permissions    TABLE       CREATE TABLE public.permissions (
    "permissionId" integer NOT NULL,
    name character varying(50),
    created_by smallint,
    updated_by smallint,
    uuid character varying(50),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.permissions;
       public         heap    postgres    false            ?            1259    16470    permission_permissionId_seq    SEQUENCE     ?   ALTER TABLE public.permissions ALTER COLUMN "permissionId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."permission_permissionId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    229            ?            1259    16472    roles    TABLE       CREATE TABLE public.roles (
    "roleId" smallint NOT NULL,
    name character varying(30),
    created_by smallint,
    updated_by smallint,
    uuid character varying(50),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.roles;
       public         heap    postgres    false            ?            1259    16475    role_roleId_seq    SEQUENCE     ?   ALTER TABLE public.roles ALTER COLUMN "roleId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."role_roleId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    231                        1259    16758    status    TABLE     b   CREATE TABLE public.status (
    "statusId" integer NOT NULL,
    status character varying(50)
);
    DROP TABLE public.status;
       public         heap    postgres    false            ?            1259    16756    status_statusId_seq    SEQUENCE     ?   ALTER TABLE public.status ALTER COLUMN "statusId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."status_statusId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    256            ?            1259    16477    supports    TABLE       CREATE TABLE public.supports (
    "supportId" integer NOT NULL,
    topic text,
    description text,
    created_by integer,
    updated_by integer,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.supports;
       public         heap    postgres    false            ?            1259    16483    support_supportId_seq    SEQUENCE     ?   ALTER TABLE public.supports ALTER COLUMN "supportId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."support_supportId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    233            ?            1259    16485    transmissions    TABLE     (  CREATE TABLE public.transmissions (
    "transmissionId" integer NOT NULL,
    name character varying(50),
    created_by integer,
    updated_by integer,
    is_active boolean,
    uuid character varying(50),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
 !   DROP TABLE public.transmissions;
       public         heap    postgres    false            ?            1259    16488    transmission_transmissionId_seq    SEQUENCE     ?   ALTER TABLE public.transmissions ALTER COLUMN "transmissionId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."transmission_transmissionId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    235            ?            1259    16490    user_card_informations    TABLE     -  CREATE TABLE public.user_card_informations (
    user_card_information_id integer NOT NULL,
    card_number character varying(20),
    card_expiry date,
    cvv integer,
    is_active boolean,
    "userId" integer,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
 *   DROP TABLE public.user_card_informations;
       public         heap    postgres    false            ?            1259    16493 2   user_card_information_user_card_information_id_seq    SEQUENCE       ALTER TABLE public.user_card_informations ALTER COLUMN user_card_information_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_card_information_user_card_information_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    237            ?            1259    16495    user_documents    TABLE       CREATE TABLE public.user_documents (
    user_document_id integer NOT NULL,
    path character varying(255),
    "userId" integer,
    document_type character varying(100),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
 "   DROP TABLE public.user_documents;
       public         heap    postgres    false            ?            1259    16498 "   user_document_user_document_id_seq    SEQUENCE     ?   ALTER TABLE public.user_documents ALTER COLUMN user_document_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_document_user_document_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    239            ?            1259    16500    user_reviews    TABLE       CREATE TABLE public.user_reviews (
    user_review_id integer NOT NULL,
    rating smallint,
    feedback text,
    is_active boolean,
    uuid character varying(50),
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
     DROP TABLE public.user_reviews;
       public         heap    postgres    false            ?            1259    16506    user_reviews_user_review_id_seq    SEQUENCE     ?   ALTER TABLE public.user_reviews ALTER COLUMN user_review_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_reviews_user_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    241            ?            1259    16508    user_transactions    TABLE     ?   CREATE TABLE public.user_transactions (
    user_transaction_id integer NOT NULL,
    amount point,
    user_card_information_id integer,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
 %   DROP TABLE public.user_transactions;
       public         heap    postgres    false            ?            1259    16511 (   user_transaction_user_transaction_id_seq    SEQUENCE     ?   ALTER TABLE public.user_transactions ALTER COLUMN user_transaction_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_transaction_user_transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    243            ?            1259    16513    users    TABLE     ?  CREATE TABLE public.users (
    "userId" integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    phoneno character varying(13),
    email character varying(255),
    password character varying(255),
    address text,
    photo character varying(255),
    cnic character varying(20),
    cnic_validity date,
    driving_license_number character varying(20),
    license_validity date,
    is_active boolean,
    otp integer,
    otp_expiry date,
    uuid character varying(50),
    "permissionId" smallint,
    "roleId" smallint,
    "cityId" smallint,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "isGoogleUser" smallint DEFAULT 0,
    "isFacebookUser" smallint DEFAULT 0
);
    DROP TABLE public.users;
       public         heap    postgres    false            ?            1259    16521    user_userId_seq    SEQUENCE     ?   ALTER TABLE public.users ALTER COLUMN "userId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."user_userId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    245            ?            1259    16523    vehicle_images    TABLE     ?   CREATE TABLE public.vehicle_images (
    vehicle_image_id integer NOT NULL,
    image_path character varying(255),
    "vehicleId" integer,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
 "   DROP TABLE public.vehicle_images;
       public         heap    postgres    false            ?            1259    16526 #   vehicle_images_vehicle_image_id_seq    SEQUENCE     ?   ALTER TABLE public.vehicle_images ALTER COLUMN vehicle_image_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.vehicle_images_vehicle_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    247            ?            1259    16528    vehicle_reviews    TABLE     ?   CREATE TABLE public.vehicle_reviews (
    vehicle_review_id integer NOT NULL,
    rating integer,
    is_active boolean,
    "vehicleId" integer,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
 #   DROP TABLE public.vehicle_reviews;
       public         heap    postgres    false            ?            1259    16531 %   vehicle_reviews_vehicle_review_id_seq    SEQUENCE     ?   ALTER TABLE public.vehicle_reviews ALTER COLUMN vehicle_review_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.vehicle_reviews_vehicle_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    249            ?            1259    16533    vehicle_types    TABLE     '  CREATE TABLE public.vehicle_types (
    vehicle_type_id integer NOT NULL,
    name character varying(50),
    created_by integer,
    updated_by integer,
    uuid character varying(50),
    is_active boolean,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
 !   DROP TABLE public.vehicle_types;
       public         heap    postgres    false            ?            1259    16536     vehicle_type_vehicle_type_id_seq    SEQUENCE     ?   ALTER TABLE public.vehicle_types ALTER COLUMN vehicle_type_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.vehicle_type_vehicle_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    251            ?            1259    16538    vehicles    TABLE     ?  CREATE TABLE public.vehicles (
    "vehicleId" integer NOT NULL,
    "locationId" integer NOT NULL,
    plate_number character varying(30),
    seats smallint,
    vehicle_type_id integer NOT NULL,
    green_vehicle_id integer NOT NULL,
    "categoryId" integer NOT NULL,
    "transmissionId" integer NOT NULL,
    "featureId" integer NOT NULL,
    main_image character varying(255),
    "guidelineId" integer NOT NULL,
    "userId" integer NOT NULL,
    created_by integer,
    updated_by integer,
    "modelId" integer NOT NULL,
    uuid character varying(50) NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    price double precision,
    price_inc_driver double precision
);
    DROP TABLE public.vehicles;
       public         heap    postgres    false            ?            1259    16541    vehicle_vehicleId_seq    SEQUENCE     ?   ALTER TABLE public.vehicles ALTER COLUMN "vehicleId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."vehicle_vehicleId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    253            ?          0    16394    State 
   TABLE DATA           4   COPY public."State" ("stateId", "Name") FROM stdin;
    public          postgres    false    201   ??       ?          0    16399    authuser 
   TABLE DATA           P   COPY public.authuser ("authuserId", phone_no, otp_code, otp_expiry) FROM stdin;
    public          postgres    false    203   ??       ?          0    16404    availability 
   TABLE DATA           N   COPY public.availability ("availabilityId", "dayId", "vehicleId") FROM stdin;
    public          postgres    false    205   R?       ?          0    16409    bookings 
   TABLE DATA           }   COPY public.bookings ("bookingId", "userId", "vehicleId", is_active, uuid, "createdAt", "updatedAt", "statusId") FROM stdin;
    public          postgres    false    207   o?       ?          0    16414 
   categories 
   TABLE DATA           {   COPY public.categories ("categoryId", name, created_by, updated_by, is_active, uuid, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    209   #?       ?          0    16419    city 
   TABLE DATA           ;   COPY public.city ("cityId", "Name", "stateId") FROM stdin;
    public          postgres    false    211   ??       ?          0    16424    days 
   TABLE DATA           -   COPY public.days ("dayId", name) FROM stdin;
    public          postgres    false    213   ??       ?          0    16429 	   favourite 
   TABLE DATA           I   COPY public.favourite ("favouriteId", "vehicleId", "userId") FROM stdin;
    public          postgres    false    215   ??       ?          0    16434    features 
   TABLE DATA           ~   COPY public.features ("featureId", name, icon, created_by, updated_by, is_active, uuid, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    217   ?       ?          0    16439    green_vehicles 
   TABLE DATA           ?   COPY public.green_vehicles (green_vehicle_id, name, created_by, updated_by, is_active, uuid, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    219   ??       ?          0    16444 
   guidelines 
   TABLE DATA           |   COPY public.guidelines ("guidelineId", name, created_by, updated_by, is_active, uuid, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    221   {?       ?          0    16449 	   locations 
   TABLE DATA           ?   COPY public.locations ("locationId", address, floor, zip_code, uuid, "cityId", latitude, longitude, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    223   	?       ?          0    16457    makes 
   TABLE DATA           r   COPY public.makes ("makeId", name, created_by, updated_by, is_active, uuid, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    225   u?       ?          0    16462    models 
   TABLE DATA           ~   COPY public.models ("modelId", name, created_by, updated_by, is_active, "makeId", uuid, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    227   (?       ?          0    16467    permissions 
   TABLE DATA           s   COPY public.permissions ("permissionId", name, created_by, updated_by, uuid, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    229   ??       ?          0    16472    roles 
   TABLE DATA           g   COPY public.roles ("roleId", name, created_by, updated_by, uuid, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    231   ;       ?          0    16758    status 
   TABLE DATA           4   COPY public.status ("statusId", status) FROM stdin;
    public          postgres    false    256   ?       ?          0    16477    supports 
   TABLE DATA              COPY public.supports ("supportId", topic, description, created_by, updated_by, "userId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    233         ?          0    16485    transmissions 
   TABLE DATA           ?   COPY public.transmissions ("transmissionId", name, created_by, updated_by, is_active, uuid, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    235         ?          0    16490    user_card_informations 
   TABLE DATA           ?   COPY public.user_card_informations (user_card_information_id, card_number, card_expiry, cvv, is_active, "userId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    237   ?      ?          0    16495    user_documents 
   TABLE DATA           s   COPY public.user_documents (user_document_id, path, "userId", document_type, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    239   3      ?          0    16500    user_reviews 
   TABLE DATA           }   COPY public.user_reviews (user_review_id, rating, feedback, is_active, uuid, "userId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    241   ?      ?          0    16508    user_transactions 
   TABLE DATA           |   COPY public.user_transactions (user_transaction_id, amount, user_card_information_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    243   ?      ?          0    16513    users 
   TABLE DATA           )  COPY public.users ("userId", firstname, lastname, phoneno, email, password, address, photo, cnic, cnic_validity, driving_license_number, license_validity, is_active, otp, otp_expiry, uuid, "permissionId", "roleId", "cityId", "createdAt", "updatedAt", "isGoogleUser", "isFacebookUser") FROM stdin;
    public          postgres    false    245   
      ?          0    16523    vehicle_images 
   TABLE DATA           m   COPY public.vehicle_images (vehicle_image_id, image_path, "vehicleId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    247   ?      ?          0    16528    vehicle_reviews 
   TABLE DATA           v   COPY public.vehicle_reviews (vehicle_review_id, rating, is_active, "vehicleId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    249   ?      ?          0    16533    vehicle_types 
   TABLE DATA           ?   COPY public.vehicle_types (vehicle_type_id, name, created_by, updated_by, uuid, is_active, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    251         ?          0    16538    vehicles 
   TABLE DATA           #  COPY public.vehicles ("vehicleId", "locationId", plate_number, seats, vehicle_type_id, green_vehicle_id, "categoryId", "transmissionId", "featureId", main_image, "guidelineId", "userId", created_by, updated_by, "modelId", uuid, "createdAt", "updatedAt", price, price_inc_driver) FROM stdin;
    public          postgres    false    253   N      ?           0    0    State_stateId_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."State_stateId_seq"', 1, true);
          public          postgres    false    202            ?           0    0    authuser_authuserId_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."authuser_authuserId_seq"', 26, true);
          public          postgres    false    204            ?           0    0    availability_availabilityId_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."availability_availabilityId_seq"', 1, false);
          public          postgres    false    206            ?           0    0    bookings_bookingId_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."bookings_bookingId_seq"', 4, true);
          public          postgres    false    208            ?           0    0    category_categoryId_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."category_categoryId_seq"', 3, true);
          public          postgres    false    210            ?           0    0    city_cityId_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."city_cityId_seq"', 3, true);
          public          postgres    false    212            ?           0    0    days_dayId_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."days_dayId_seq"', 1, false);
          public          postgres    false    214            ?           0    0    favourite_favouriteId_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."favourite_favouriteId_seq"', 1, false);
          public          postgres    false    216            ?           0    0    feature_featureId_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."feature_featureId_seq"', 4, true);
          public          postgres    false    218            ?           0    0 "   green_vehicle_green_vehicle_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.green_vehicle_green_vehicle_id_seq', 2, true);
          public          postgres    false    220            ?           0    0    guideline_guidelineId_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."guideline_guidelineId_seq"', 2, true);
          public          postgres    false    222                        0    0    location_locationId_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."location_locationId_seq"', 3, true);
          public          postgres    false    224                       0    0    make_makeId_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."make_makeId_seq"', 4, true);
          public          postgres    false    226                       0    0    model_modelId_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."model_modelId_seq"', 3, true);
          public          postgres    false    228                       0    0    permission_permissionId_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."permission_permissionId_seq"', 1, true);
          public          postgres    false    230                       0    0    role_roleId_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."role_roleId_seq"', 4, true);
          public          postgres    false    232                       0    0    status_statusId_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."status_statusId_seq"', 2, true);
          public          postgres    false    255                       0    0    support_supportId_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."support_supportId_seq"', 1, false);
          public          postgres    false    234                       0    0    transmission_transmissionId_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."transmission_transmissionId_seq"', 2, true);
          public          postgres    false    236                       0    0 2   user_card_information_user_card_information_id_seq    SEQUENCE SET     `   SELECT pg_catalog.setval('public.user_card_information_user_card_information_id_seq', 5, true);
          public          postgres    false    238            	           0    0 "   user_document_user_document_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.user_document_user_document_id_seq', 5, true);
          public          postgres    false    240            
           0    0    user_reviews_user_review_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.user_reviews_user_review_id_seq', 1, false);
          public          postgres    false    242                       0    0 (   user_transaction_user_transaction_id_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.user_transaction_user_transaction_id_seq', 1, false);
          public          postgres    false    244                       0    0    user_userId_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."user_userId_seq"', 19, true);
          public          postgres    false    246                       0    0 #   vehicle_images_vehicle_image_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.vehicle_images_vehicle_image_id_seq', 1, false);
          public          postgres    false    248                       0    0 %   vehicle_reviews_vehicle_review_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.vehicle_reviews_vehicle_review_id_seq', 1, false);
          public          postgres    false    250                       0    0     vehicle_type_vehicle_type_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.vehicle_type_vehicle_type_id_seq', 1, true);
          public          postgres    false    252                       0    0    vehicle_vehicleId_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."vehicle_vehicleId_seq"', 8, true);
          public          postgres    false    254            ?           2606    16544    State State_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."State"
    ADD CONSTRAINT "State_pkey" PRIMARY KEY ("stateId");
 >   ALTER TABLE ONLY public."State" DROP CONSTRAINT "State_pkey";
       public            postgres    false    201            ?           2606    16546    authuser authuser_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.authuser
    ADD CONSTRAINT authuser_pkey PRIMARY KEY ("authuserId");
 @   ALTER TABLE ONLY public.authuser DROP CONSTRAINT authuser_pkey;
       public            postgres    false    203            ?           2606    16548    availability availability_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.availability
    ADD CONSTRAINT availability_pkey PRIMARY KEY ("availabilityId");
 H   ALTER TABLE ONLY public.availability DROP CONSTRAINT availability_pkey;
       public            postgres    false    205            ?           2606    16550    bookings bookings_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY ("bookingId");
 @   ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_pkey;
       public            postgres    false    207            ?           2606    16552    categories category_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT category_pkey PRIMARY KEY ("categoryId");
 B   ALTER TABLE ONLY public.categories DROP CONSTRAINT category_pkey;
       public            postgres    false    209            ?           2606    16554    city city_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_pkey PRIMARY KEY ("cityId");
 8   ALTER TABLE ONLY public.city DROP CONSTRAINT city_pkey;
       public            postgres    false    211            ?           2606    16556    days days_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.days
    ADD CONSTRAINT days_pkey PRIMARY KEY ("dayId");
 8   ALTER TABLE ONLY public.days DROP CONSTRAINT days_pkey;
       public            postgres    false    213            ?           2606    16558    favourite favourite_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.favourite
    ADD CONSTRAINT favourite_pkey PRIMARY KEY ("favouriteId");
 B   ALTER TABLE ONLY public.favourite DROP CONSTRAINT favourite_pkey;
       public            postgres    false    215            ?           2606    16560    features feature_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.features
    ADD CONSTRAINT feature_pkey PRIMARY KEY ("featureId");
 ?   ALTER TABLE ONLY public.features DROP CONSTRAINT feature_pkey;
       public            postgres    false    217            ?           2606    16562 !   green_vehicles green_vehicle_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.green_vehicles
    ADD CONSTRAINT green_vehicle_pkey PRIMARY KEY (green_vehicle_id);
 K   ALTER TABLE ONLY public.green_vehicles DROP CONSTRAINT green_vehicle_pkey;
       public            postgres    false    219            ?           2606    16564    guidelines guideline_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.guidelines
    ADD CONSTRAINT guideline_pkey PRIMARY KEY ("guidelineId");
 C   ALTER TABLE ONLY public.guidelines DROP CONSTRAINT guideline_pkey;
       public            postgres    false    221            ?           2606    16566    locations location_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.locations
    ADD CONSTRAINT location_pkey PRIMARY KEY ("locationId");
 A   ALTER TABLE ONLY public.locations DROP CONSTRAINT location_pkey;
       public            postgres    false    223            ?           2606    16568    makes make_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.makes
    ADD CONSTRAINT make_pkey PRIMARY KEY ("makeId");
 9   ALTER TABLE ONLY public.makes DROP CONSTRAINT make_pkey;
       public            postgres    false    225            ?           2606    16570    models model_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.models
    ADD CONSTRAINT model_pkey PRIMARY KEY ("modelId");
 ;   ALTER TABLE ONLY public.models DROP CONSTRAINT model_pkey;
       public            postgres    false    227            ?           2606    16572    permissions permission_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permission_pkey PRIMARY KEY ("permissionId");
 E   ALTER TABLE ONLY public.permissions DROP CONSTRAINT permission_pkey;
       public            postgres    false    229            ?           2606    16574    roles role_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT role_pkey PRIMARY KEY ("roleId");
 9   ALTER TABLE ONLY public.roles DROP CONSTRAINT role_pkey;
       public            postgres    false    231                       2606    16762    status status_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY ("statusId");
 <   ALTER TABLE ONLY public.status DROP CONSTRAINT status_pkey;
       public            postgres    false    256            ?           2606    16576    supports support_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.supports
    ADD CONSTRAINT support_pkey PRIMARY KEY ("supportId");
 ?   ALTER TABLE ONLY public.supports DROP CONSTRAINT support_pkey;
       public            postgres    false    233            ?           2606    16578    transmissions transmission_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.transmissions
    ADD CONSTRAINT transmission_pkey PRIMARY KEY ("transmissionId");
 I   ALTER TABLE ONLY public.transmissions DROP CONSTRAINT transmission_pkey;
       public            postgres    false    235            ?           2606    16580 1   user_card_informations user_card_information_pkey 
   CONSTRAINT     ?   ALTER TABLE ONLY public.user_card_informations
    ADD CONSTRAINT user_card_information_pkey PRIMARY KEY (user_card_information_id);
 [   ALTER TABLE ONLY public.user_card_informations DROP CONSTRAINT user_card_information_pkey;
       public            postgres    false    237            ?           2606    16582 !   user_documents user_document_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.user_documents
    ADD CONSTRAINT user_document_pkey PRIMARY KEY (user_document_id);
 K   ALTER TABLE ONLY public.user_documents DROP CONSTRAINT user_document_pkey;
       public            postgres    false    239                       2606    16584    users user_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY ("userId");
 9   ALTER TABLE ONLY public.users DROP CONSTRAINT user_pkey;
       public            postgres    false    245            ?           2606    16586    user_reviews user_reviews_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.user_reviews
    ADD CONSTRAINT user_reviews_pkey PRIMARY KEY (user_review_id);
 H   ALTER TABLE ONLY public.user_reviews DROP CONSTRAINT user_reviews_pkey;
       public            postgres    false    241            ?           2606    16588 '   user_transactions user_transaction_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.user_transactions
    ADD CONSTRAINT user_transaction_pkey PRIMARY KEY (user_transaction_id);
 Q   ALTER TABLE ONLY public.user_transactions DROP CONSTRAINT user_transaction_pkey;
       public            postgres    false    243                       2606    16590 "   vehicle_images vehicle_images_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.vehicle_images
    ADD CONSTRAINT vehicle_images_pkey PRIMARY KEY (vehicle_image_id);
 L   ALTER TABLE ONLY public.vehicle_images DROP CONSTRAINT vehicle_images_pkey;
       public            postgres    false    247                       2606    16592    vehicles vehicle_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicle_pkey PRIMARY KEY ("vehicleId");
 ?   ALTER TABLE ONLY public.vehicles DROP CONSTRAINT vehicle_pkey;
       public            postgres    false    253                       2606    16594 $   vehicle_reviews vehicle_reviews_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.vehicle_reviews
    ADD CONSTRAINT vehicle_reviews_pkey PRIMARY KEY (vehicle_review_id);
 N   ALTER TABLE ONLY public.vehicle_reviews DROP CONSTRAINT vehicle_reviews_pkey;
       public            postgres    false    249            	           2606    16596    vehicle_types vehicle_type_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.vehicle_types
    ADD CONSTRAINT vehicle_type_pkey PRIMARY KEY (vehicle_type_id);
 I   ALTER TABLE ONLY public.vehicle_types DROP CONSTRAINT vehicle_type_pkey;
       public            postgres    false    251            
           1259    16597    fki_categoryId    INDEX     M   CREATE INDEX "fki_categoryId" ON public.vehicles USING btree ("categoryId");
 $   DROP INDEX public."fki_categoryId";
       public            postgres    false    253            ?           1259    16598 
   fki_cityId    INDEX     B   CREATE INDEX "fki_cityId" ON public.users USING btree ("cityId");
     DROP INDEX public."fki_cityId";
       public            postgres    false    245            ?           1259    16599 	   fki_dayId    INDEX     G   CREATE INDEX "fki_dayId" ON public.availability USING btree ("dayId");
    DROP INDEX public."fki_dayId";
       public            postgres    false    205                       1259    16600    fki_featureId    INDEX     K   CREATE INDEX "fki_featureId" ON public.vehicles USING btree ("featureId");
 #   DROP INDEX public."fki_featureId";
       public            postgres    false    253                       1259    16601    fki_green_vehicle_id    INDEX     U   CREATE INDEX fki_green_vehicle_id ON public.vehicles USING btree (green_vehicle_id);
 (   DROP INDEX public.fki_green_vehicle_id;
       public            postgres    false    253                       1259    16602    fki_guidelineId    INDEX     O   CREATE INDEX "fki_guidelineId" ON public.vehicles USING btree ("guidelineId");
 %   DROP INDEX public."fki_guidelineId";
       public            postgres    false    253                       1259    16603    fki_locationId    INDEX     M   CREATE INDEX "fki_locationId" ON public.vehicles USING btree ("locationId");
 $   DROP INDEX public."fki_locationId";
       public            postgres    false    253            ?           1259    16604 
   fki_makeId    INDEX     C   CREATE INDEX "fki_makeId" ON public.models USING btree ("makeId");
     DROP INDEX public."fki_makeId";
       public            postgres    false    227                       1259    16605    fki_modelId    INDEX     G   CREATE INDEX "fki_modelId" ON public.vehicles USING btree ("modelId");
 !   DROP INDEX public."fki_modelId";
       public            postgres    false    253            ?           1259    16606    fki_permissionId    INDEX     N   CREATE INDEX "fki_permissionId" ON public.users USING btree ("permissionId");
 &   DROP INDEX public."fki_permissionId";
       public            postgres    false    245                        1259    16607 
   fki_roleId    INDEX     B   CREATE INDEX "fki_roleId" ON public.users USING btree ("roleId");
     DROP INDEX public."fki_roleId";
       public            postgres    false    245            ?           1259    16608    fki_stateId    INDEX     C   CREATE INDEX "fki_stateId" ON public.city USING btree ("stateId");
 !   DROP INDEX public."fki_stateId";
       public            postgres    false    211            ?           1259    16768    fki_statusId    INDEX     I   CREATE INDEX "fki_statusId" ON public.bookings USING btree ("statusId");
 "   DROP INDEX public."fki_statusId";
       public            postgres    false    207                       1259    16609    fki_transmissionId    INDEX     U   CREATE INDEX "fki_transmissionId" ON public.vehicles USING btree ("transmissionId");
 (   DROP INDEX public."fki_transmissionId";
       public            postgres    false    253            ?           1259    16610 
   fki_userId    INDEX     I   CREATE INDEX "fki_userId" ON public.user_reviews USING btree ("userId");
     DROP INDEX public."fki_userId";
       public            postgres    false    241            ?           1259    16611    fki_user_card_information_id    INDEX     n   CREATE INDEX fki_user_card_information_id ON public.user_transactions USING btree (user_card_information_id);
 0   DROP INDEX public.fki_user_card_information_id;
       public            postgres    false    243                       1259    16612    fki_vehicleId    INDEX     Q   CREATE INDEX "fki_vehicleId" ON public.vehicle_images USING btree ("vehicleId");
 #   DROP INDEX public."fki_vehicleId";
       public            postgres    false    247                       1259    16613    fki_vehicle_type_id    INDEX     S   CREATE INDEX fki_vehicle_type_id ON public.vehicles USING btree (vehicle_type_id);
 '   DROP INDEX public.fki_vehicle_type_id;
       public            postgres    false    253            *           2606    16614    vehicles categoryId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT "categoryId" FOREIGN KEY ("categoryId") REFERENCES public.categories("categoryId") NOT VALID;
 ?   ALTER TABLE ONLY public.vehicles DROP CONSTRAINT "categoryId";
       public          postgres    false    209    253    3031                       2606    16619    locations cityId    FK CONSTRAINT     w   ALTER TABLE ONLY public.locations
    ADD CONSTRAINT "cityId" FOREIGN KEY ("cityId") REFERENCES public.city("cityId");
 <   ALTER TABLE ONLY public.locations DROP CONSTRAINT "cityId";
       public          postgres    false    3033    223    211            %           2606    16624    users cityId    FK CONSTRAINT     }   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "cityId" FOREIGN KEY ("cityId") REFERENCES public.city("cityId") NOT VALID;
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT "cityId";
       public          postgres    false    245    211    3033                       2606    16629    availability dayId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.availability
    ADD CONSTRAINT "dayId" FOREIGN KEY ("dayId") REFERENCES public.days("dayId") NOT VALID;
 >   ALTER TABLE ONLY public.availability DROP CONSTRAINT "dayId";
       public          postgres    false    213    205    3036            +           2606    16634    vehicles featureId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT "featureId" FOREIGN KEY ("featureId") REFERENCES public.features("featureId") NOT VALID;
 >   ALTER TABLE ONLY public.vehicles DROP CONSTRAINT "featureId";
       public          postgres    false    3040    253    217            ,           2606    16639    vehicles green_vehicle_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT green_vehicle_id FOREIGN KEY (green_vehicle_id) REFERENCES public.green_vehicles(green_vehicle_id) NOT VALID;
 C   ALTER TABLE ONLY public.vehicles DROP CONSTRAINT green_vehicle_id;
       public          postgres    false    219    3042    253            -           2606    16644    vehicles guidelineId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT "guidelineId" FOREIGN KEY ("guidelineId") REFERENCES public.guidelines("guidelineId") NOT VALID;
 @   ALTER TABLE ONLY public.vehicles DROP CONSTRAINT "guidelineId";
       public          postgres    false    253    3044    221            .           2606    16649    vehicles locationId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT "locationId" FOREIGN KEY ("locationId") REFERENCES public.locations("locationId") NOT VALID;
 ?   ALTER TABLE ONLY public.vehicles DROP CONSTRAINT "locationId";
       public          postgres    false    223    253    3046                       2606    16654    models makeId    FK CONSTRAINT        ALTER TABLE ONLY public.models
    ADD CONSTRAINT "makeId" FOREIGN KEY ("makeId") REFERENCES public.makes("makeId") NOT VALID;
 9   ALTER TABLE ONLY public.models DROP CONSTRAINT "makeId";
       public          postgres    false    227    3048    225            /           2606    16659    vehicles modelId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT "modelId" FOREIGN KEY ("modelId") REFERENCES public.models("modelId") NOT VALID;
 <   ALTER TABLE ONLY public.vehicles DROP CONSTRAINT "modelId";
       public          postgres    false    3051    227    253            &           2606    16664    users permissionId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "permissionId" FOREIGN KEY ("permissionId") REFERENCES public.permissions("permissionId") NOT VALID;
 >   ALTER TABLE ONLY public.users DROP CONSTRAINT "permissionId";
       public          postgres    false    245    229    3053            '           2606    16669    users roleId    FK CONSTRAINT     ~   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "roleId" FOREIGN KEY ("roleId") REFERENCES public.roles("roleId") NOT VALID;
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT "roleId";
       public          postgres    false    231    245    3055                       2606    16674    city stateId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.city
    ADD CONSTRAINT "stateId" FOREIGN KEY ("stateId") REFERENCES public."State"("stateId") NOT VALID;
 8   ALTER TABLE ONLY public.city DROP CONSTRAINT "stateId";
       public          postgres    false    201    211    3021                       2606    16763    bookings statusId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT "statusId" FOREIGN KEY ("statusId") REFERENCES public.status("statusId") NOT VALID;
 =   ALTER TABLE ONLY public.bookings DROP CONSTRAINT "statusId";
       public          postgres    false    207    3093    256            0           2606    16679    vehicles transmissionId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT "transmissionId" FOREIGN KEY ("transmissionId") REFERENCES public.transmissions("transmissionId") NOT VALID;
 C   ALTER TABLE ONLY public.vehicles DROP CONSTRAINT "transmissionId";
       public          postgres    false    235    3059    253            #           2606    16684    user_reviews userId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.user_reviews
    ADD CONSTRAINT "userId" FOREIGN KEY ("userId") REFERENCES public.users("userId") NOT VALID;
 ?   ALTER TABLE ONLY public.user_reviews DROP CONSTRAINT "userId";
       public          postgres    false    241    245    3074            !           2606    16689    user_card_informations userId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.user_card_informations
    ADD CONSTRAINT "userId" FOREIGN KEY ("userId") REFERENCES public.users("userId") NOT VALID;
 I   ALTER TABLE ONLY public.user_card_informations DROP CONSTRAINT "userId";
       public          postgres    false    3074    237    245                        2606    16694    supports userId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.supports
    ADD CONSTRAINT "userId" FOREIGN KEY ("userId") REFERENCES public.users("userId") NOT VALID;
 ;   ALTER TABLE ONLY public.supports DROP CONSTRAINT "userId";
       public          postgres    false    245    233    3074            "           2606    16699    user_documents userId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.user_documents
    ADD CONSTRAINT "userId" FOREIGN KEY ("userId") REFERENCES public.users("userId") NOT VALID;
 A   ALTER TABLE ONLY public.user_documents DROP CONSTRAINT "userId";
       public          postgres    false    245    239    3074            1           2606    16704    vehicles userId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT "userId" FOREIGN KEY ("userId") REFERENCES public.users("userId") NOT VALID;
 ;   ALTER TABLE ONLY public.vehicles DROP CONSTRAINT "userId";
       public          postgres    false    3074    245    253                       2606    16709    favourite userId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.favourite
    ADD CONSTRAINT "userId" FOREIGN KEY ("userId") REFERENCES public.users("userId") NOT VALID;
 <   ALTER TABLE ONLY public.favourite DROP CONSTRAINT "userId";
       public          postgres    false    3074    215    245                       2606    16714    bookings userId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT "userId" FOREIGN KEY ("userId") REFERENCES public.users("userId") NOT VALID;
 ;   ALTER TABLE ONLY public.bookings DROP CONSTRAINT "userId";
       public          postgres    false    3074    207    245            $           2606    16719 *   user_transactions user_card_information_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.user_transactions
    ADD CONSTRAINT user_card_information_id FOREIGN KEY (user_card_information_id) REFERENCES public.user_card_informations(user_card_information_id) NOT VALID;
 T   ALTER TABLE ONLY public.user_transactions DROP CONSTRAINT user_card_information_id;
       public          postgres    false    237    243    3061            (           2606    16724    vehicle_images vehicleId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.vehicle_images
    ADD CONSTRAINT "vehicleId" FOREIGN KEY ("vehicleId") REFERENCES public.vehicles("vehicleId") NOT VALID;
 D   ALTER TABLE ONLY public.vehicle_images DROP CONSTRAINT "vehicleId";
       public          postgres    false    3091    247    253                       2606    16729    availability vehicleId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.availability
    ADD CONSTRAINT "vehicleId" FOREIGN KEY ("vehicleId") REFERENCES public.vehicles("vehicleId") NOT VALID;
 B   ALTER TABLE ONLY public.availability DROP CONSTRAINT "vehicleId";
       public          postgres    false    253    3091    205                       2606    16734    favourite vehicleId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.favourite
    ADD CONSTRAINT "vehicleId" FOREIGN KEY ("vehicleId") REFERENCES public.vehicles("vehicleId") NOT VALID;
 ?   ALTER TABLE ONLY public.favourite DROP CONSTRAINT "vehicleId";
       public          postgres    false    3091    215    253            )           2606    16739    vehicle_reviews vehicleId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.vehicle_reviews
    ADD CONSTRAINT "vehicleId" FOREIGN KEY ("vehicleId") REFERENCES public.vehicles("vehicleId") NOT VALID;
 E   ALTER TABLE ONLY public.vehicle_reviews DROP CONSTRAINT "vehicleId";
       public          postgres    false    249    3091    253                       2606    16744    bookings vehicleId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT "vehicleId" FOREIGN KEY ("vehicleId") REFERENCES public.vehicles("vehicleId") NOT VALID;
 >   ALTER TABLE ONLY public.bookings DROP CONSTRAINT "vehicleId";
       public          postgres    false    207    3091    253            2           2606    16749    vehicles vehicle_type_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicle_type_id FOREIGN KEY (vehicle_type_id) REFERENCES public.vehicle_types(vehicle_type_id) NOT VALID;
 B   ALTER TABLE ONLY public.vehicles DROP CONSTRAINT vehicle_type_id;
       public          postgres    false    3081    251    253            ?      x?3?(??JL?????? ?M      ?   a   x?]˱1?خ???=w'	ɪ??? 1l?丶???9h?!H7?F<?F?ת䅘???c?0?fAѱ?yB? ?#?>????V?\???5?|S??      ?      x?????? ? ?      ?   ?   x?}?9n1?X:E?\?DQgq"?O??Á?c8.?????V¬s?I?x?jJK4i????qy???Jb?X???vB???I?}*??R?j0¾?????L^??j?<?N?R??T|(w?*??wB?־)|9??0d_?k%8Ԧ??⌦?????׳???}??      ?   x   x?}?1? Eg8E???vl0??s?,4?c?z?6S?????'?Gn?>z?n[?12
`?x."?b??7??????^K?N??P?X?P?q< ӎВU͉??v?lB*?ZП??gj??7?{(:      ?      x?3??I??/J?4?????? #?      ?      x?????? ? ?      ?      x?????? ? ?      ?   ?   x?u?An?0??+r/h?+Z???? K?P?P h?|?q4iӂ{"?3Js???u?m?M??mkx???????>?A??3? ???"??k?????z?W?X???kg?ݟ?4? Z}??{e?K?4?ƩX??f???@??m??????.?N㭪?wV??VC?$?8.Soa??$>?YbF??Y5j?a5??????N?R?      ?   ?   x?m??
?0Dg?+?IV?ѥk;??!4???O????ޑ?mk޻c??m??/3^?چ?P C?>I?D3]????!&?g?????3?
a?R`?????Pb?0/:?5f?o?O??????c??st??7?/d      ?   ~   x?]?A
!?ᵞ?}?$Qc?!???@???i?BaVo???(L?|???{?+?$.V?P?h???O#!Zi?????%?:[򾦳.?dM?>Ɣ??Έ??~ykn8?_d(?(???u???P'?      ?   \   x?}ʱ?0?ڙ?}???!???H?Pߩ?O?Mx2 i?E;k??+jd3eUT\??E??=P? 3,cꨫ٪>`?z????!????3      ?   ?   x?}?M
?0F??)?K??%Mr q?	?Ih?l????EE?E???TK_?Z?jo?# 2 ??8?$?????4??4/?1?
7˲S?Qr?X,6?S? -?:?]~{?z?y0??3&㺠??b?ֹ$?F???5[?????P?Dl#??'$?m??j???F?      ?   ?   x?e?=?0F???Q"۱?$??,i????ӓ?@?Ȗ?g?}&u????_N׳?V?"n??L?;?? 5)p?????-??БK	z+7 ?H???ҮAͳ?>Tn@*?P?7?G4?zo?a?S?X?}?L?I?"?O????/u^?y^]Ϧ?x??k:???B???H????? A.      ?   <   x?3?tM?,?4B?D??D#Sݔ4#K]sC]Kss]SSsKc#SK?? ?????? [*?      ?   ?   x?U??
?0???_V???d?DO~A/1?-u+ſ7? ?szCpʏ?	T???r?\X???P|?B??V??yZ???M?%4md5???:ۺ???~??????7J??U?,$l? ?֙R?vι/?/]      ?   "   x?3?t,((?/KM?2?t??-?I-?c???? ~#      ?      x?????? ? ?      ?   {   x?u?1!kx}d?5a?\sDG?"?????n7??u?5?t????q&.AR˥	b?????k? Ig?C*??;?X??uP?r??]K5??????MsT??iG?|d[?޿H?'l      ?   z   x?m?9?0k??	\:??#?GT????bAͣ?1a??IE??i?}Лп;+?3??[m=^;RɐtT?.?F???vM??O?H??Yc?]~E7?=????!?6RP????2??F3?      ?   ?   x??Ρ?0?a?>E=iww??[?3$f?H?u???(??????׶??Z:?A?#D?#???????s5D?%1S5 ??z1??????Rܶ???p<?sh???A???????Č?DZ?O?#h ?I??????A?      ?      x?????? ? ?      ?      x?????? ? ?      ?   ?  x????k\EpDND*(B??(e?????D??b??̵?mbHR??H?^Jm??HA???"/X|????????d??&u???sfw?|?w?oF6'???Fsr=m5?3&,Ղ5[??[?I۰ӆw?`\??Yv1n?????=?y???Q?,??F#???g?;`??k?N??L?&	6i<??7FH?c????{H?c??ѧX?tԿ?Q??i??%ݼ??k?@Ǟ??l????n??Fġ?so?p?#?z??R?{?&?)?C??/?3B?'??? W??wB#Md1P????a??R R 	4a?	$1JyB??m???Y?J??Yvo?T潥?:?u!??x????d??Y"???g?	M?
Qr??T;?jg?@??^8???0?nd=5K|t??,w???,??I.?K)??JJƤ><\?l??8.2?K(???i??9?=18?s?????????7?+?41Ia?&b f???????7??M??ήm?????u?v?窤?6x??F;???píĺ?u?????/??X??ӻ??'")" ?a?I?.d???????#???-??=?51?L?? ?l?Fs?R??s?NJ -3\_n?$6M?,8?2%?|?	???P&?z?ĳ({٪??\>{?ި??MW???O??<???0?>?HHZ?S"N14????8\4;11???僦^>^[???|{??W߮_?^??[?*_????C?n?ĩ??5?s??@?????*?<?K?W?&/??H??P1>????}?t,??z?^,w?ׯ?+G륵??[?ya?nk?'?t??
/4?B?I֜Ƅ??N~膾Ψ7-?)?LK?V?Uo??}?^????ʭ?.W?<c?x??+??_????@?c??5F8?pG	??;??w???@`}m?6????^n??7???w?\?7?J??9?7?g?-????|?h??~?^??>V??@?????|??e??Ěx?q?h?#?G\?&K???N???Me????|?D?????Uz??%?fs̲AܻY_:R>-?O???x??]???_*?<].???? I*J?Ҹ?j??8ωr?j??RlfkˠG ??Gh5???s??ٖ???f?{?8?{y< ??6Vp??yu?Zo?;?f?????R.֏??o??r??꾿ߋ?? ????C???2???lR?s?&?Az????1&?-??Mc?]ZZ???cY      ?      x?????? ? ?      ?      x?????? ? ?      ?   .   x?3?,I-.???!??D???D??D adhdbrB??b???? t??      ?   ?   x????N!??3<?w?f??Ћ?	z??x1m????]k???HH??e????@D??v???m?~?y??Y=Og,???еv?v?o??[m???;?w?%?x??{???lX???"~e??@??q??aZ?e??v-?0???2}????6????AIF?Q??e:???F?;?z??"?xL{??&?I׎uݜJl.j%Ue
??H??5zNxE??t???IX52?DM1??Lƕ?־???     