import * as $protobuf from "protobufjs";
/** Namespace chromeos_update_engine. */
export namespace chromeos_update_engine {

    /** Properties of an Extent. */
    interface IExtent {

        /** Extent startBlock */
        startBlock?: (number|Long|null);

        /** Extent numBlocks */
        numBlocks?: (number|Long|null);
    }

    /** Represents an Extent. */
    class Extent implements IExtent {

        /**
         * Constructs a new Extent.
         * @param [properties] Properties to set
         */
        constructor(properties?: chromeos_update_engine.IExtent);

        /** Extent startBlock. */
        public startBlock: (number|Long);

        /** Extent numBlocks. */
        public numBlocks: (number|Long);

        /**
         * Creates a new Extent instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Extent instance
         */
        public static create(properties?: chromeos_update_engine.IExtent): chromeos_update_engine.Extent;

        /**
         * Encodes the specified Extent message. Does not implicitly {@link chromeos_update_engine.Extent.verify|verify} messages.
         * @param message Extent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chromeos_update_engine.IExtent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Extent message, length delimited. Does not implicitly {@link chromeos_update_engine.Extent.verify|verify} messages.
         * @param message Extent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chromeos_update_engine.IExtent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Extent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Extent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chromeos_update_engine.Extent;

        /**
         * Decodes an Extent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Extent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chromeos_update_engine.Extent;

        /**
         * Verifies an Extent message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Extent message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Extent
         */
        public static fromObject(object: { [k: string]: any }): chromeos_update_engine.Extent;

        /**
         * Creates a plain object from an Extent message. Also converts values to other types if specified.
         * @param message Extent
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chromeos_update_engine.Extent, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Extent to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Signatures. */
    interface ISignatures {

        /** Signatures signatures */
        signatures?: (chromeos_update_engine.Signatures.ISignature[]|null);
    }

    /** Represents a Signatures. */
    class Signatures implements ISignatures {

        /**
         * Constructs a new Signatures.
         * @param [properties] Properties to set
         */
        constructor(properties?: chromeos_update_engine.ISignatures);

        /** Signatures signatures. */
        public signatures: chromeos_update_engine.Signatures.ISignature[];

        /**
         * Creates a new Signatures instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Signatures instance
         */
        public static create(properties?: chromeos_update_engine.ISignatures): chromeos_update_engine.Signatures;

        /**
         * Encodes the specified Signatures message. Does not implicitly {@link chromeos_update_engine.Signatures.verify|verify} messages.
         * @param message Signatures message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chromeos_update_engine.ISignatures, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Signatures message, length delimited. Does not implicitly {@link chromeos_update_engine.Signatures.verify|verify} messages.
         * @param message Signatures message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chromeos_update_engine.ISignatures, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Signatures message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Signatures
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chromeos_update_engine.Signatures;

        /**
         * Decodes a Signatures message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Signatures
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chromeos_update_engine.Signatures;

        /**
         * Verifies a Signatures message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Signatures message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Signatures
         */
        public static fromObject(object: { [k: string]: any }): chromeos_update_engine.Signatures;

        /**
         * Creates a plain object from a Signatures message. Also converts values to other types if specified.
         * @param message Signatures
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chromeos_update_engine.Signatures, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Signatures to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Signatures {

        /** Properties of a Signature. */
        interface ISignature {

            /** Signature version */
            version?: (number|null);

            /** Signature data */
            data?: (Uint8Array|null);

            /** Signature unpaddedSignatureSize */
            unpaddedSignatureSize?: (number|null);
        }

        /** Represents a Signature. */
        class Signature implements ISignature {

            /**
             * Constructs a new Signature.
             * @param [properties] Properties to set
             */
            constructor(properties?: chromeos_update_engine.Signatures.ISignature);

            /** Signature version. */
            public version: number;

            /** Signature data. */
            public data: Uint8Array;

            /** Signature unpaddedSignatureSize. */
            public unpaddedSignatureSize: number;

            /**
             * Creates a new Signature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Signature instance
             */
            public static create(properties?: chromeos_update_engine.Signatures.ISignature): chromeos_update_engine.Signatures.Signature;

            /**
             * Encodes the specified Signature message. Does not implicitly {@link chromeos_update_engine.Signatures.Signature.verify|verify} messages.
             * @param message Signature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: chromeos_update_engine.Signatures.ISignature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Signature message, length delimited. Does not implicitly {@link chromeos_update_engine.Signatures.Signature.verify|verify} messages.
             * @param message Signature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: chromeos_update_engine.Signatures.ISignature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Signature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Signature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chromeos_update_engine.Signatures.Signature;

            /**
             * Decodes a Signature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Signature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chromeos_update_engine.Signatures.Signature;

            /**
             * Verifies a Signature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Signature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Signature
             */
            public static fromObject(object: { [k: string]: any }): chromeos_update_engine.Signatures.Signature;

            /**
             * Creates a plain object from a Signature message. Also converts values to other types if specified.
             * @param message Signature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: chromeos_update_engine.Signatures.Signature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Signature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a PartitionInfo. */
    interface IPartitionInfo {

        /** PartitionInfo size */
        size?: (number|Long|null);

        /** PartitionInfo hash */
        hash?: (Uint8Array|null);
    }

    /** Represents a PartitionInfo. */
    class PartitionInfo implements IPartitionInfo {

        /**
         * Constructs a new PartitionInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: chromeos_update_engine.IPartitionInfo);

        /** PartitionInfo size. */
        public size: (number|Long);

        /** PartitionInfo hash. */
        public hash: Uint8Array;

        /**
         * Creates a new PartitionInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PartitionInfo instance
         */
        public static create(properties?: chromeos_update_engine.IPartitionInfo): chromeos_update_engine.PartitionInfo;

        /**
         * Encodes the specified PartitionInfo message. Does not implicitly {@link chromeos_update_engine.PartitionInfo.verify|verify} messages.
         * @param message PartitionInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chromeos_update_engine.IPartitionInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PartitionInfo message, length delimited. Does not implicitly {@link chromeos_update_engine.PartitionInfo.verify|verify} messages.
         * @param message PartitionInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chromeos_update_engine.IPartitionInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PartitionInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PartitionInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chromeos_update_engine.PartitionInfo;

        /**
         * Decodes a PartitionInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PartitionInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chromeos_update_engine.PartitionInfo;

        /**
         * Verifies a PartitionInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PartitionInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PartitionInfo
         */
        public static fromObject(object: { [k: string]: any }): chromeos_update_engine.PartitionInfo;

        /**
         * Creates a plain object from a PartitionInfo message. Also converts values to other types if specified.
         * @param message PartitionInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chromeos_update_engine.PartitionInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PartitionInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an InstallOperation. */
    interface IInstallOperation {

        /** InstallOperation type */
        type: chromeos_update_engine.InstallOperation.Type;

        /** InstallOperation dataOffset */
        dataOffset?: (number|Long|null);

        /** InstallOperation dataLength */
        dataLength?: (number|Long|null);

        /** InstallOperation srcExtents */
        srcExtents?: (chromeos_update_engine.IExtent[]|null);

        /** InstallOperation srcLength */
        srcLength?: (number|Long|null);

        /** InstallOperation dstExtents */
        dstExtents?: (chromeos_update_engine.IExtent[]|null);

        /** InstallOperation dstLength */
        dstLength?: (number|Long|null);

        /** InstallOperation dataSha256Hash */
        dataSha256Hash?: (Uint8Array|null);

        /** InstallOperation srcSha256Hash */
        srcSha256Hash?: (Uint8Array|null);
    }

    /** Represents an InstallOperation. */
    class InstallOperation implements IInstallOperation {

        /**
         * Constructs a new InstallOperation.
         * @param [properties] Properties to set
         */
        constructor(properties?: chromeos_update_engine.IInstallOperation);

        /** InstallOperation type. */
        public type: chromeos_update_engine.InstallOperation.Type;

        /** InstallOperation dataOffset. */
        public dataOffset: (number|Long);

        /** InstallOperation dataLength. */
        public dataLength: (number|Long);

        /** InstallOperation srcExtents. */
        public srcExtents: chromeos_update_engine.IExtent[];

        /** InstallOperation srcLength. */
        public srcLength: (number|Long);

        /** InstallOperation dstExtents. */
        public dstExtents: chromeos_update_engine.IExtent[];

        /** InstallOperation dstLength. */
        public dstLength: (number|Long);

        /** InstallOperation dataSha256Hash. */
        public dataSha256Hash: Uint8Array;

        /** InstallOperation srcSha256Hash. */
        public srcSha256Hash: Uint8Array;

        /**
         * Creates a new InstallOperation instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InstallOperation instance
         */
        public static create(properties?: chromeos_update_engine.IInstallOperation): chromeos_update_engine.InstallOperation;

        /**
         * Encodes the specified InstallOperation message. Does not implicitly {@link chromeos_update_engine.InstallOperation.verify|verify} messages.
         * @param message InstallOperation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chromeos_update_engine.IInstallOperation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InstallOperation message, length delimited. Does not implicitly {@link chromeos_update_engine.InstallOperation.verify|verify} messages.
         * @param message InstallOperation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chromeos_update_engine.IInstallOperation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InstallOperation message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InstallOperation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chromeos_update_engine.InstallOperation;

        /**
         * Decodes an InstallOperation message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InstallOperation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chromeos_update_engine.InstallOperation;

        /**
         * Verifies an InstallOperation message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InstallOperation message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InstallOperation
         */
        public static fromObject(object: { [k: string]: any }): chromeos_update_engine.InstallOperation;

        /**
         * Creates a plain object from an InstallOperation message. Also converts values to other types if specified.
         * @param message InstallOperation
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chromeos_update_engine.InstallOperation, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InstallOperation to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace InstallOperation {

        /** Type enum. */
        enum Type {
            REPLACE = 0,
            REPLACE_BZ = 1,
            MOVE = 2,
            BSDIFF = 3,
            SOURCE_COPY = 4,
            SOURCE_BSDIFF = 5,
            REPLACE_XZ = 8,
            ZERO = 6,
            DISCARD = 7,
            BROTLI_BSDIFF = 10,
            PUFFDIFF = 9,
            ZUCCHINI = 11,
            LZ4DIFF_BSDIFF = 12,
            LZ4DIFF_PUFFDIFF = 13
        }
    }

    /** Properties of a CowMergeOperation. */
    interface ICowMergeOperation {

        /** CowMergeOperation type */
        type?: (chromeos_update_engine.CowMergeOperation.Type|null);

        /** CowMergeOperation srcExtent */
        srcExtent?: (chromeos_update_engine.IExtent|null);

        /** CowMergeOperation dstExtent */
        dstExtent?: (chromeos_update_engine.IExtent|null);

        /** CowMergeOperation srcOffset */
        srcOffset?: (number|null);
    }

    /** Represents a CowMergeOperation. */
    class CowMergeOperation implements ICowMergeOperation {

        /**
         * Constructs a new CowMergeOperation.
         * @param [properties] Properties to set
         */
        constructor(properties?: chromeos_update_engine.ICowMergeOperation);

        /** CowMergeOperation type. */
        public type: chromeos_update_engine.CowMergeOperation.Type;

        /** CowMergeOperation srcExtent. */
        public srcExtent?: (chromeos_update_engine.IExtent|null);

        /** CowMergeOperation dstExtent. */
        public dstExtent?: (chromeos_update_engine.IExtent|null);

        /** CowMergeOperation srcOffset. */
        public srcOffset: number;

        /**
         * Creates a new CowMergeOperation instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CowMergeOperation instance
         */
        public static create(properties?: chromeos_update_engine.ICowMergeOperation): chromeos_update_engine.CowMergeOperation;

        /**
         * Encodes the specified CowMergeOperation message. Does not implicitly {@link chromeos_update_engine.CowMergeOperation.verify|verify} messages.
         * @param message CowMergeOperation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chromeos_update_engine.ICowMergeOperation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CowMergeOperation message, length delimited. Does not implicitly {@link chromeos_update_engine.CowMergeOperation.verify|verify} messages.
         * @param message CowMergeOperation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chromeos_update_engine.ICowMergeOperation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CowMergeOperation message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CowMergeOperation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chromeos_update_engine.CowMergeOperation;

        /**
         * Decodes a CowMergeOperation message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CowMergeOperation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chromeos_update_engine.CowMergeOperation;

        /**
         * Verifies a CowMergeOperation message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CowMergeOperation message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CowMergeOperation
         */
        public static fromObject(object: { [k: string]: any }): chromeos_update_engine.CowMergeOperation;

        /**
         * Creates a plain object from a CowMergeOperation message. Also converts values to other types if specified.
         * @param message CowMergeOperation
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chromeos_update_engine.CowMergeOperation, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CowMergeOperation to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace CowMergeOperation {

        /** Type enum. */
        enum Type {
            COW_COPY = 0,
            COW_XOR = 1,
            COW_REPLACE = 2
        }
    }

    /** Properties of a PartitionUpdate. */
    interface IPartitionUpdate {

        /** PartitionUpdate partitionName */
        partitionName: string;

        /** PartitionUpdate runPostinstall */
        runPostinstall?: (boolean|null);

        /** PartitionUpdate postinstallPath */
        postinstallPath?: (string|null);

        /** PartitionUpdate filesystemType */
        filesystemType?: (string|null);

        /** PartitionUpdate newPartitionSignature */
        newPartitionSignature?: (chromeos_update_engine.Signatures.ISignature[]|null);

        /** PartitionUpdate oldPartitionInfo */
        oldPartitionInfo?: (chromeos_update_engine.IPartitionInfo|null);

        /** PartitionUpdate newPartitionInfo */
        newPartitionInfo?: (chromeos_update_engine.IPartitionInfo|null);

        /** PartitionUpdate operations */
        operations?: (chromeos_update_engine.IInstallOperation[]|null);

        /** PartitionUpdate postinstallOptional */
        postinstallOptional?: (boolean|null);

        /** PartitionUpdate hashTreeDataExtent */
        hashTreeDataExtent?: (chromeos_update_engine.IExtent|null);

        /** PartitionUpdate hashTreeExtent */
        hashTreeExtent?: (chromeos_update_engine.IExtent|null);

        /** PartitionUpdate hashTreeAlgorithm */
        hashTreeAlgorithm?: (string|null);

        /** PartitionUpdate hashTreeSalt */
        hashTreeSalt?: (Uint8Array|null);

        /** PartitionUpdate fecDataExtent */
        fecDataExtent?: (chromeos_update_engine.IExtent|null);

        /** PartitionUpdate fecExtent */
        fecExtent?: (chromeos_update_engine.IExtent|null);

        /** PartitionUpdate fecRoots */
        fecRoots?: (number|null);

        /** PartitionUpdate version */
        version?: (string|null);

        /** PartitionUpdate mergeOperations */
        mergeOperations?: (chromeos_update_engine.ICowMergeOperation[]|null);

        /** PartitionUpdate estimateCowSize */
        estimateCowSize?: (number|Long|null);

        /** PartitionUpdate estimateOpCountMax */
        estimateOpCountMax?: (number|Long|null);
    }

    /** Represents a PartitionUpdate. */
    class PartitionUpdate implements IPartitionUpdate {

        /**
         * Constructs a new PartitionUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: chromeos_update_engine.IPartitionUpdate);

        /** PartitionUpdate partitionName. */
        public partitionName: string;

        /** PartitionUpdate runPostinstall. */
        public runPostinstall: boolean;

        /** PartitionUpdate postinstallPath. */
        public postinstallPath: string;

        /** PartitionUpdate filesystemType. */
        public filesystemType: string;

        /** PartitionUpdate newPartitionSignature. */
        public newPartitionSignature: chromeos_update_engine.Signatures.ISignature[];

        /** PartitionUpdate oldPartitionInfo. */
        public oldPartitionInfo?: (chromeos_update_engine.IPartitionInfo|null);

        /** PartitionUpdate newPartitionInfo. */
        public newPartitionInfo?: (chromeos_update_engine.IPartitionInfo|null);

        /** PartitionUpdate operations. */
        public operations: chromeos_update_engine.IInstallOperation[];

        /** PartitionUpdate postinstallOptional. */
        public postinstallOptional: boolean;

        /** PartitionUpdate hashTreeDataExtent. */
        public hashTreeDataExtent?: (chromeos_update_engine.IExtent|null);

        /** PartitionUpdate hashTreeExtent. */
        public hashTreeExtent?: (chromeos_update_engine.IExtent|null);

        /** PartitionUpdate hashTreeAlgorithm. */
        public hashTreeAlgorithm: string;

        /** PartitionUpdate hashTreeSalt. */
        public hashTreeSalt: Uint8Array;

        /** PartitionUpdate fecDataExtent. */
        public fecDataExtent?: (chromeos_update_engine.IExtent|null);

        /** PartitionUpdate fecExtent. */
        public fecExtent?: (chromeos_update_engine.IExtent|null);

        /** PartitionUpdate fecRoots. */
        public fecRoots: number;

        /** PartitionUpdate version. */
        public version: string;

        /** PartitionUpdate mergeOperations. */
        public mergeOperations: chromeos_update_engine.ICowMergeOperation[];

        /** PartitionUpdate estimateCowSize. */
        public estimateCowSize: (number|Long);

        /** PartitionUpdate estimateOpCountMax. */
        public estimateOpCountMax: (number|Long);

        /**
         * Creates a new PartitionUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PartitionUpdate instance
         */
        public static create(properties?: chromeos_update_engine.IPartitionUpdate): chromeos_update_engine.PartitionUpdate;

        /**
         * Encodes the specified PartitionUpdate message. Does not implicitly {@link chromeos_update_engine.PartitionUpdate.verify|verify} messages.
         * @param message PartitionUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chromeos_update_engine.IPartitionUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PartitionUpdate message, length delimited. Does not implicitly {@link chromeos_update_engine.PartitionUpdate.verify|verify} messages.
         * @param message PartitionUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chromeos_update_engine.IPartitionUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PartitionUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PartitionUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chromeos_update_engine.PartitionUpdate;

        /**
         * Decodes a PartitionUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PartitionUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chromeos_update_engine.PartitionUpdate;

        /**
         * Verifies a PartitionUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PartitionUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PartitionUpdate
         */
        public static fromObject(object: { [k: string]: any }): chromeos_update_engine.PartitionUpdate;

        /**
         * Creates a plain object from a PartitionUpdate message. Also converts values to other types if specified.
         * @param message PartitionUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chromeos_update_engine.PartitionUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PartitionUpdate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DynamicPartitionGroup. */
    interface IDynamicPartitionGroup {

        /** DynamicPartitionGroup name */
        name: string;

        /** DynamicPartitionGroup size */
        size?: (number|Long|null);

        /** DynamicPartitionGroup partitionNames */
        partitionNames?: (string[]|null);
    }

    /** Represents a DynamicPartitionGroup. */
    class DynamicPartitionGroup implements IDynamicPartitionGroup {

        /**
         * Constructs a new DynamicPartitionGroup.
         * @param [properties] Properties to set
         */
        constructor(properties?: chromeos_update_engine.IDynamicPartitionGroup);

        /** DynamicPartitionGroup name. */
        public name: string;

        /** DynamicPartitionGroup size. */
        public size: (number|Long);

        /** DynamicPartitionGroup partitionNames. */
        public partitionNames: string[];

        /**
         * Creates a new DynamicPartitionGroup instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DynamicPartitionGroup instance
         */
        public static create(properties?: chromeos_update_engine.IDynamicPartitionGroup): chromeos_update_engine.DynamicPartitionGroup;

        /**
         * Encodes the specified DynamicPartitionGroup message. Does not implicitly {@link chromeos_update_engine.DynamicPartitionGroup.verify|verify} messages.
         * @param message DynamicPartitionGroup message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chromeos_update_engine.IDynamicPartitionGroup, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DynamicPartitionGroup message, length delimited. Does not implicitly {@link chromeos_update_engine.DynamicPartitionGroup.verify|verify} messages.
         * @param message DynamicPartitionGroup message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chromeos_update_engine.IDynamicPartitionGroup, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DynamicPartitionGroup message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DynamicPartitionGroup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chromeos_update_engine.DynamicPartitionGroup;

        /**
         * Decodes a DynamicPartitionGroup message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DynamicPartitionGroup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chromeos_update_engine.DynamicPartitionGroup;

        /**
         * Verifies a DynamicPartitionGroup message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DynamicPartitionGroup message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DynamicPartitionGroup
         */
        public static fromObject(object: { [k: string]: any }): chromeos_update_engine.DynamicPartitionGroup;

        /**
         * Creates a plain object from a DynamicPartitionGroup message. Also converts values to other types if specified.
         * @param message DynamicPartitionGroup
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chromeos_update_engine.DynamicPartitionGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DynamicPartitionGroup to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a VABCFeatureSet. */
    interface IVABCFeatureSet {

        /** VABCFeatureSet threaded */
        threaded?: (boolean|null);

        /** VABCFeatureSet batchWrites */
        batchWrites?: (boolean|null);
    }

    /** Represents a VABCFeatureSet. */
    class VABCFeatureSet implements IVABCFeatureSet {

        /**
         * Constructs a new VABCFeatureSet.
         * @param [properties] Properties to set
         */
        constructor(properties?: chromeos_update_engine.IVABCFeatureSet);

        /** VABCFeatureSet threaded. */
        public threaded: boolean;

        /** VABCFeatureSet batchWrites. */
        public batchWrites: boolean;

        /**
         * Creates a new VABCFeatureSet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VABCFeatureSet instance
         */
        public static create(properties?: chromeos_update_engine.IVABCFeatureSet): chromeos_update_engine.VABCFeatureSet;

        /**
         * Encodes the specified VABCFeatureSet message. Does not implicitly {@link chromeos_update_engine.VABCFeatureSet.verify|verify} messages.
         * @param message VABCFeatureSet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chromeos_update_engine.IVABCFeatureSet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VABCFeatureSet message, length delimited. Does not implicitly {@link chromeos_update_engine.VABCFeatureSet.verify|verify} messages.
         * @param message VABCFeatureSet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chromeos_update_engine.IVABCFeatureSet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VABCFeatureSet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VABCFeatureSet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chromeos_update_engine.VABCFeatureSet;

        /**
         * Decodes a VABCFeatureSet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VABCFeatureSet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chromeos_update_engine.VABCFeatureSet;

        /**
         * Verifies a VABCFeatureSet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VABCFeatureSet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VABCFeatureSet
         */
        public static fromObject(object: { [k: string]: any }): chromeos_update_engine.VABCFeatureSet;

        /**
         * Creates a plain object from a VABCFeatureSet message. Also converts values to other types if specified.
         * @param message VABCFeatureSet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chromeos_update_engine.VABCFeatureSet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VABCFeatureSet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DynamicPartitionMetadata. */
    interface IDynamicPartitionMetadata {

        /** DynamicPartitionMetadata groups */
        groups?: (chromeos_update_engine.IDynamicPartitionGroup[]|null);

        /** DynamicPartitionMetadata snapshotEnabled */
        snapshotEnabled?: (boolean|null);

        /** DynamicPartitionMetadata vabcEnabled */
        vabcEnabled?: (boolean|null);

        /** DynamicPartitionMetadata vabcCompressionParam */
        vabcCompressionParam?: (string|null);

        /** DynamicPartitionMetadata cowVersion */
        cowVersion?: (number|null);

        /** DynamicPartitionMetadata vabcFeatureSet */
        vabcFeatureSet?: (chromeos_update_engine.IVABCFeatureSet|null);

        /** DynamicPartitionMetadata compressionFactor */
        compressionFactor?: (number|Long|null);
    }

    /** Represents a DynamicPartitionMetadata. */
    class DynamicPartitionMetadata implements IDynamicPartitionMetadata {

        /**
         * Constructs a new DynamicPartitionMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: chromeos_update_engine.IDynamicPartitionMetadata);

        /** DynamicPartitionMetadata groups. */
        public groups: chromeos_update_engine.IDynamicPartitionGroup[];

        /** DynamicPartitionMetadata snapshotEnabled. */
        public snapshotEnabled: boolean;

        /** DynamicPartitionMetadata vabcEnabled. */
        public vabcEnabled: boolean;

        /** DynamicPartitionMetadata vabcCompressionParam. */
        public vabcCompressionParam: string;

        /** DynamicPartitionMetadata cowVersion. */
        public cowVersion: number;

        /** DynamicPartitionMetadata vabcFeatureSet. */
        public vabcFeatureSet?: (chromeos_update_engine.IVABCFeatureSet|null);

        /** DynamicPartitionMetadata compressionFactor. */
        public compressionFactor: (number|Long);

        /**
         * Creates a new DynamicPartitionMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DynamicPartitionMetadata instance
         */
        public static create(properties?: chromeos_update_engine.IDynamicPartitionMetadata): chromeos_update_engine.DynamicPartitionMetadata;

        /**
         * Encodes the specified DynamicPartitionMetadata message. Does not implicitly {@link chromeos_update_engine.DynamicPartitionMetadata.verify|verify} messages.
         * @param message DynamicPartitionMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chromeos_update_engine.IDynamicPartitionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DynamicPartitionMetadata message, length delimited. Does not implicitly {@link chromeos_update_engine.DynamicPartitionMetadata.verify|verify} messages.
         * @param message DynamicPartitionMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chromeos_update_engine.IDynamicPartitionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DynamicPartitionMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DynamicPartitionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chromeos_update_engine.DynamicPartitionMetadata;

        /**
         * Decodes a DynamicPartitionMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DynamicPartitionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chromeos_update_engine.DynamicPartitionMetadata;

        /**
         * Verifies a DynamicPartitionMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DynamicPartitionMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DynamicPartitionMetadata
         */
        public static fromObject(object: { [k: string]: any }): chromeos_update_engine.DynamicPartitionMetadata;

        /**
         * Creates a plain object from a DynamicPartitionMetadata message. Also converts values to other types if specified.
         * @param message DynamicPartitionMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chromeos_update_engine.DynamicPartitionMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DynamicPartitionMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ApexInfo. */
    interface IApexInfo {

        /** ApexInfo packageName */
        packageName?: (string|null);

        /** ApexInfo version */
        version?: (number|Long|null);

        /** ApexInfo isCompressed */
        isCompressed?: (boolean|null);

        /** ApexInfo decompressedSize */
        decompressedSize?: (number|Long|null);
    }

    /** Represents an ApexInfo. */
    class ApexInfo implements IApexInfo {

        /**
         * Constructs a new ApexInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: chromeos_update_engine.IApexInfo);

        /** ApexInfo packageName. */
        public packageName: string;

        /** ApexInfo version. */
        public version: (number|Long);

        /** ApexInfo isCompressed. */
        public isCompressed: boolean;

        /** ApexInfo decompressedSize. */
        public decompressedSize: (number|Long);

        /**
         * Creates a new ApexInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApexInfo instance
         */
        public static create(properties?: chromeos_update_engine.IApexInfo): chromeos_update_engine.ApexInfo;

        /**
         * Encodes the specified ApexInfo message. Does not implicitly {@link chromeos_update_engine.ApexInfo.verify|verify} messages.
         * @param message ApexInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chromeos_update_engine.IApexInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApexInfo message, length delimited. Does not implicitly {@link chromeos_update_engine.ApexInfo.verify|verify} messages.
         * @param message ApexInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chromeos_update_engine.IApexInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApexInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApexInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chromeos_update_engine.ApexInfo;

        /**
         * Decodes an ApexInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApexInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chromeos_update_engine.ApexInfo;

        /**
         * Verifies an ApexInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApexInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApexInfo
         */
        public static fromObject(object: { [k: string]: any }): chromeos_update_engine.ApexInfo;

        /**
         * Creates a plain object from an ApexInfo message. Also converts values to other types if specified.
         * @param message ApexInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chromeos_update_engine.ApexInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApexInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ApexMetadata. */
    interface IApexMetadata {

        /** ApexMetadata apexInfo */
        apexInfo?: (chromeos_update_engine.IApexInfo[]|null);
    }

    /** Represents an ApexMetadata. */
    class ApexMetadata implements IApexMetadata {

        /**
         * Constructs a new ApexMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: chromeos_update_engine.IApexMetadata);

        /** ApexMetadata apexInfo. */
        public apexInfo: chromeos_update_engine.IApexInfo[];

        /**
         * Creates a new ApexMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApexMetadata instance
         */
        public static create(properties?: chromeos_update_engine.IApexMetadata): chromeos_update_engine.ApexMetadata;

        /**
         * Encodes the specified ApexMetadata message. Does not implicitly {@link chromeos_update_engine.ApexMetadata.verify|verify} messages.
         * @param message ApexMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chromeos_update_engine.IApexMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApexMetadata message, length delimited. Does not implicitly {@link chromeos_update_engine.ApexMetadata.verify|verify} messages.
         * @param message ApexMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chromeos_update_engine.IApexMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApexMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApexMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chromeos_update_engine.ApexMetadata;

        /**
         * Decodes an ApexMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApexMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chromeos_update_engine.ApexMetadata;

        /**
         * Verifies an ApexMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApexMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApexMetadata
         */
        public static fromObject(object: { [k: string]: any }): chromeos_update_engine.ApexMetadata;

        /**
         * Creates a plain object from an ApexMetadata message. Also converts values to other types if specified.
         * @param message ApexMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chromeos_update_engine.ApexMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApexMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DeltaArchiveManifest. */
    interface IDeltaArchiveManifest {

        /** DeltaArchiveManifest blockSize */
        blockSize?: (number|null);

        /** DeltaArchiveManifest signaturesOffset */
        signaturesOffset?: (number|Long|null);

        /** DeltaArchiveManifest signaturesSize */
        signaturesSize?: (number|Long|null);

        /** DeltaArchiveManifest minorVersion */
        minorVersion?: (number|null);

        /** DeltaArchiveManifest partitions */
        partitions?: (chromeos_update_engine.IPartitionUpdate[]|null);

        /** DeltaArchiveManifest maxTimestamp */
        maxTimestamp?: (number|Long|null);

        /** DeltaArchiveManifest dynamicPartitionMetadata */
        dynamicPartitionMetadata?: (chromeos_update_engine.IDynamicPartitionMetadata|null);

        /** DeltaArchiveManifest partialUpdate */
        partialUpdate?: (boolean|null);

        /** DeltaArchiveManifest apexInfo */
        apexInfo?: (chromeos_update_engine.IApexInfo[]|null);

        /** DeltaArchiveManifest securityPatchLevel */
        securityPatchLevel?: (string|null);
    }

    /** Represents a DeltaArchiveManifest. */
    class DeltaArchiveManifest implements IDeltaArchiveManifest {

        /**
         * Constructs a new DeltaArchiveManifest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chromeos_update_engine.IDeltaArchiveManifest);

        /** DeltaArchiveManifest blockSize. */
        public blockSize: number;

        /** DeltaArchiveManifest signaturesOffset. */
        public signaturesOffset: (number|Long);

        /** DeltaArchiveManifest signaturesSize. */
        public signaturesSize: (number|Long);

        /** DeltaArchiveManifest minorVersion. */
        public minorVersion: number;

        /** DeltaArchiveManifest partitions. */
        public partitions: chromeos_update_engine.IPartitionUpdate[];

        /** DeltaArchiveManifest maxTimestamp. */
        public maxTimestamp: (number|Long);

        /** DeltaArchiveManifest dynamicPartitionMetadata. */
        public dynamicPartitionMetadata?: (chromeos_update_engine.IDynamicPartitionMetadata|null);

        /** DeltaArchiveManifest partialUpdate. */
        public partialUpdate: boolean;

        /** DeltaArchiveManifest apexInfo. */
        public apexInfo: chromeos_update_engine.IApexInfo[];

        /** DeltaArchiveManifest securityPatchLevel. */
        public securityPatchLevel: string;

        /**
         * Creates a new DeltaArchiveManifest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DeltaArchiveManifest instance
         */
        public static create(properties?: chromeos_update_engine.IDeltaArchiveManifest): chromeos_update_engine.DeltaArchiveManifest;

        /**
         * Encodes the specified DeltaArchiveManifest message. Does not implicitly {@link chromeos_update_engine.DeltaArchiveManifest.verify|verify} messages.
         * @param message DeltaArchiveManifest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chromeos_update_engine.IDeltaArchiveManifest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DeltaArchiveManifest message, length delimited. Does not implicitly {@link chromeos_update_engine.DeltaArchiveManifest.verify|verify} messages.
         * @param message DeltaArchiveManifest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chromeos_update_engine.IDeltaArchiveManifest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DeltaArchiveManifest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DeltaArchiveManifest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chromeos_update_engine.DeltaArchiveManifest;

        /**
         * Decodes a DeltaArchiveManifest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DeltaArchiveManifest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chromeos_update_engine.DeltaArchiveManifest;

        /**
         * Verifies a DeltaArchiveManifest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DeltaArchiveManifest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DeltaArchiveManifest
         */
        public static fromObject(object: { [k: string]: any }): chromeos_update_engine.DeltaArchiveManifest;

        /**
         * Creates a plain object from a DeltaArchiveManifest message. Also converts values to other types if specified.
         * @param message DeltaArchiveManifest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chromeos_update_engine.DeltaArchiveManifest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DeltaArchiveManifest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
